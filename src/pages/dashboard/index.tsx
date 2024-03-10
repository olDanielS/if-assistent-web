import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from '../../components/Title'

import { FiBook, FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'

import './dashboard.css'
import { format } from 'date-fns'

import { Link } from "react-router-dom";

import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';
import { db } from "../../services/firebaseConnect";

const listRef = collection(db, "Chamados");

interface DocumentData {
    id: string,
    name: string;
    description: string;
    lab: string;
    created: Date;
    equip: string;
    createdFormat: string;
    status: string;
    number: string;
}
export default function Dashboard() {
    const { } = useContext(AuthContext)

    const [tickets, setTickets] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEmply, setIsEmply] = useState(false);
    const [lastItem, setLastItem] = useState();
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        async function loadTickets() {
            const consult = query(listRef, orderBy('status', 'asc'), limit(5));

            const consultSnapshot = await getDocs(consult);
            setTickets([])
            await updateState(consultSnapshot)

            setLoading(false)
        }

        loadTickets();

        return () => { }
    },
        [])

    async function updateState(consultSnapshot) {
        const isCollectionEmpty = consultSnapshot.size === 0;

        if (!isCollectionEmpty) {
            let list: DocumentData[] = [];

            consultSnapshot.forEach((doc) => {
                const data = doc.data() as DocumentData;
                const formattedDate = format(data.created.toDate(), 'dd/MM/yyyy');
                list.push({
                    id: doc.id,
                    description: data.description,
                    lab: data.lab,
                    name: data.name,
                    created: data.created,
                    equip: data.equip,
                    createdFormat: formattedDate,
                    status: data.status,
                    number: data.number,

                });
            });
            const lastDoc= consultSnapshot.docs[consultSnapshot.docs.length - 1]
            setLastItem(lastDoc)

            setTickets(chamados => [...chamados, ...list]);

        } else {
            setIsEmply(true)
        }
        setLoadingMore(false)
    }

    if(loading){
        return(
            <div>
                <Header/>
                <div className="content">
                    <Title name="Chamados">
                        <FiMessageSquare size={25}/>
                    </Title>
                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    async function handleMore(){
            setLoadingMore(true);
            const q = query(listRef, orderBy('status', 'asc'),startAfter(lastItem), limit(5));
            const querySnapshot = await getDocs(q);

            await updateState(querySnapshot)
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={24} />
                </Title>


                {tickets.length === 0 ? (
                    <div className="container dashboard">
                        <span>Sem chamados para carregar...</span>
                        <Link to="/new" className="newCall">
                            <FiPlus color="#FFF" size={25} />
                            Novo chamado
                        </Link>
                    </div>
                ) :
                    (
                        <>
                            <Link to="/new" className="newCall">
                                <FiPlus size={24} />
                                Novo chamado
                            </Link>


                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Usuario</th>
                                        <th scope="col">Laboratorio</th>
                                        <th scope="col">Equipamento</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Aberto em</th>
                                        <th scope="col">Nº Patrimonio</th>
                                        <th scope="col">Descrição</th>
                                        <th scope="col">Ações</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label="Cliente" className="user-data">{item.name}</td>
                                                <td data-label="laboratorio">{item.lab}</td>
                                                <td data-label="Equipamento">{item.equip}</td>
                                                <td data-label="Status">
                                                    <span className="style-status" style={{ padding: 5, backgroundColor: item.status == 'Aberto' ? '#02945D' : '#999' }}>{item.status }</span>
                                                </td>
                                                <td data-label="created" className="user-data">{item.createdFormat}</td>
                                                <td data-label="patrimonio" className="user-data">{item.number}</td>
                                                <td data-label="Descricao" className="user-data">{item.description}</td>
                                                <td data-label="#">
                                                    <button className="action" style={{ backgroundColor: "#3583f6" }}>
                                                        <FiSearch size={16} color="FFF" />
                                                    </button>
                                                    <Link to={`/new/${item.id}`}className="action" style={{ backgroundColor: "#d6a935" }}>
                                                        <FiEdit2 size={16} color="FFF" />
                                                    </Link>
                                                </td>
                                            </tr>

                                        )
                                    })}

                                </tbody>
                            </table>
                            {
                                loadingMore && <h3>Buscando mais chamados...</h3>
                            }
                           {!loadingMore && !isEmply &&  <button className="btn-more" onClick={handleMore}>Buscar mais</button> }
                        </>
                    )

                }



            </div>
        </div>
    );
}