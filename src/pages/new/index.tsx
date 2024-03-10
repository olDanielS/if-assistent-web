import React, {useState, useContext} from "react";
import { AuthContext } from "../../contexts/auth";

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiPlus } from "react-icons/fi";
import './new.css'

import { db } from '../../services/firebaseConnect';
import { addDoc, collection} from "firebase/firestore";

import {toast} from 'react-toastify';

export default function New() {

    const [name, setName] = useState("");
    const [lab, setLab] = useState("F1");
    const [number, setNumber] = useState("");
    const [equip, setEquip] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const {user} = useContext(AuthContext);

    

    function handleOptionChange(e){
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeSelect(e){
        setLab(e.target.value)
        console.log(e.target.value)
    }

    async function handleRegister(e){
        e.preventDefault();
        if(!name || !lab || !status|| !description){
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
            setNumber("")
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
                <Title name="Novo chamado">
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
                       type="text"  
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