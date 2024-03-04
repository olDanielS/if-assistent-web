import React, { useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from '../../components/Title'

import { FiBook, FiMessageSquare, FiPlus, FiSearch, FiEdit2} from 'react-icons/fi'

import './dashboard.css'

import { Link } from "react-router-dom";

export default function Dashboard() {
    const {  } = useContext(AuthContext)

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={24} />
                </Title>

                <>
                <Link to="/new" className="newCall">
                    <FiPlus size={24}/>
                    Novo chamado
                </Link>
                </>
    
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Laboratorio</th>
                            <th scope="col">Equipamento</th>
                            <th scope="col">Status</th>
                            <th scope="col">Nº Patrimonio</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Cliente" className="user-data">Daniel</td>
                            <td data-label="laboratorio">F5</td>
                            <td data-label="Equipamento">Computador</td>
                            <td data-label="Status">
                                <span className="style-status" style={{backgroundColor: "#999"}}>Em aberto</span>
                            </td>
                            <td data-label="patrimonio"className="user-data">5566</td>
                            <td data-label="Descricao" className="user-data">Não liga</td>
                            <td data-label="#">
                                <button className="action" style={{backgroundColor: "#3583f6"}}>
                                    <FiSearch size={16} color="FFF"/>
                                </button>
                                <button className="action" style={{backgroundColor: "#d6a935"}}>
                                    <FiEdit2 size={16} color="FFF"/>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td data-label="Cliente" className="user-data">cliente 2</td>
                            <td data-label="laboratorio">F5</td>
                            <td data-label="Equipamento">Computador</td>
                            <td data-label="Status">
                                <span className="style-status" style={{backgroundColor: "#999"}}>Em aberto</span>
                            </td>
                            <td data-label="patrimonio" className="user-data">5566</td>
                            <td data-label="Descricao" className="user-data">O computador apresenta problema ao ligar</td>
                            <td data-label="#">
                                <button className="action" style={{backgroundColor: "#3583f6"}}>
                                    <FiSearch size={16} color="FFF"/>
                                </button>
                                <button className="action" style={{backgroundColor: "#d6a935"}}>
                                    <FiEdit2 size={16} color="FFF"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}