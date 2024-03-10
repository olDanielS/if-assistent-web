import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiPlus } from "react-icons/fi";
import './new.css'

import { useParams, useNavigate } from 'react-router-dom'

import { db } from '../../services/firebaseConnect';
import { addDoc, collection, getDoc, getDocs, doc, updateDoc } from "firebase/firestore";

import { toast } from 'react-toastify';

interface ContextProps {
    user: {
        uid: string
    }
}
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
    userID: string
}

interface ChamadoData {
    name: string;
    lab: string;
    equip: string;
    number: string;
    status: string;
    description: string;
}

const listRef = collection(db, "Chamados");

export default function New() {

    const [name, setName] = useState("");
    const [lab, setLab] = useState("F1");
    const [number, setNumber] = useState("");
    const [equip, setEquip] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const [idCustomer, setIdCustomer] = useState(false); //Estado para verificar se estamos adicionando ou cadastrando

    const navigate = useNavigate();


    const { user } = useContext(AuthContext) as ContextProps;
    const { id } = useParams();

    useEffect(() => {
        async function loadTickets() {
            const docRef = doc(db, "Chamados", id);
            await getDoc(docRef).then((snapshot) => {

                const data = snapshot.data() as DocumentData;

                setName(data.name)
                setLab(data.lab)
                setEquip(data.equip)
                //setNumber(data.number ? data.number : '')
                setStatus(data.status)
                setDescription(data.description)

                setIdCustomer(true)

            }).catch((error) => {
                console.log(error)
                setIdCustomer(false)
            })

        }

        loadTickets();

        return () => { }
    },
        [id])




    function handleOptionChange(e) {
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeSelect(e) {
        setLab(e.target.value)
        console.log(e.target.value)
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (idCustomer) {
            //Atualizando

            const docRef = doc(db, "Chamados", id);
            
            await updateDoc(docRef, {
                name: name,
                lab: lab,
                number: number,
                status: status,
                description: description,
                equip: equip,
                userID: user.uid

            }).then(() => {
                toast.info("Atualizado com sucesso!");
                setName("");
                setDescription("");
                setEquip("");
                setStatus("");
                setNumber("");
                navigate("/dashboard");

        }).catch((error) => {
            toast.error("Ops, erro ao atualizar o chamado")
            console.log(error)
        })

        return;
    }

    if (!name || !lab || !status || !description) {
        toast.error("Ops, Verifique os campos e tente novamente")
        return

    }

    await addDoc(collection(db, "Chamados"), {
        created: new Date(),
        name: name,
        lab: lab,
        number: number,
        status: status,
        description: description,
        equip: equip,
        userID: user.uid

    }).then(() => {
        toast.success("Chamado registrado")
        setName("")
        setDescription("")
        setEquip("")
        setStatus("")
        setNumber("")

        navigate("/dashboard");
    }).catch((error) => {
        console.log(user)
        toast.error("Ops, erro ao registrar o chamado")
        console.log(error)
    })

}

return (
    <div>
        <Header />

        <div className="content">
            <Title name={id ? "Editando Chamado" : "Novo chamado"}>
                <FiPlus size={24} />
            </Title>

            <div className="container">
                <form className="form-user" onSubmit={handleRegister}>
                    <label>Usuario</label>
                    <input type="text" placeholder="Ex: Daniel Oliveira"
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="input"
                    />

                    <label>Laboratorio</label>
                    <select value={lab} onChange={handleChangeSelect}>
                        <option key={1} value={"F1"}>F1</option>
                        <option key={2} value={"F2"}>F2</option>
                        <option key={3} value={"F3"}>F3</option>
                        <option key={4} value={"F4"}>F4</option>
                        <option key={5} value={"F5"}>F5</option>
                        <option key={6} value={"G4"}>G4</option>
                        <option key={7} value={"G3"}>G3</option>


                    </select>

                    <label>Equipamento</label>
                    <input type="text" placeholder="Computador"
                        value={equip} onChange={(e) => setEquip(e.target.value)}
                        className="input"
                    />
                    <label>Nº patrimonio  <span>(Opcional)</span></label>
                    <input type="number" placeholder="5566"
                        value={number} onChange={(e) => setNumber(e.target.value)}
                        className="input"
                    />

                    <label>Status</label>
                    <div className="status">
                        <input type="radio"
                            name="radio"
                            value="Aberto"
                            checked={status === "Aberto"}
                            onChange={handleOptionChange}

                        />
                        <span>Em aberto</span>

                        <input type="radio"
                            name="radio"
                            value="Progresso"
                            checked={status === "Progresso"}
                            onChange={handleOptionChange}

                        />
                        <span>Progresso</span>


                        <input type="radio"
                            name="radio"
                            value="Atendido"
                            checked={status === "Atendido"}
                            onChange={handleOptionChange}

                        />
                        <span>Atendido</span>

                    </div>

                    <textarea

                        placeholder="Descrição do problema."
                        value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    </div>
);
}