import React, {useState} from "react";

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiPlus } from "react-icons/fi";

import './styles.css'

export default function New() {

    const [name, setName] = useState("");
    const [lab, setLab] = useState("");
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    function handleOptionChange(e){
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeSelect(e){
        setLab(e.target.value)
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Novo chamado">
                    <FiPlus size={24} />
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label>Usuario</label>
                        <input type="text" placeholder="Ex: Daniel Oliveira" 
                            value={name} onChange={(e) => setName(e.target.value)}
                        />

                        <label>Laboratorio</label>
                        <select value={lab} onChange={handleChangeSelect}>
                            <option key={1} value={1}>F1</option>
                            <option key={2} value={2}>F2</option>
                            <option key={3} value={3}>F3</option>
                            <option key={4} value={4}>F4</option>
                            <option key={5} value={5}>F5</option>
                            <option key={6} value={6}>G4</option>
                            <option key={7} value={7}>G3</option>
                          

                        </select>

                        <label>Nº patrimonio</label>
                        <input type="text" placeholder="5566"
                             value={number} onChange={(e) => setNumber(e.target.value)}
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