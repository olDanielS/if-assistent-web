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


const listRef = collection(db, "faqs");

export default function NewFaq() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();


    const { user } = useContext(AuthContext) as ContextProps;


    async function handleRegister(e) {
        e.preventDefault();

    if (!title || !content) {
        toast.error("Ops, Verifique os campos e tente novamente")
        return

    }

    await addDoc(collection(db, "faqs"), {
        title: title,
        content: content

    }).then(() => {
        toast.success("Chamado registrado")
        setTitle("")
        setContent("")

        navigate("/faqs");
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
            <Title name="Nova FAQ">
                <FiPlus size={24} />
            </Title>

            <div className="container">
                <form className="form-user" onSubmit={handleRegister}>
                    <label>Titulo da FAQ</label>
                    <input type="text" placeholder="Ex: O que fazer quando um problema acontecer?"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                        className="input"
                    />

                    <label>Resposta para a FAQ</label>
                    <textarea placeholder="Informar os passos a serem seguidos"
                        value={content} onChange={(e) => setContent(e.target.value)}
                        className="input"
                    />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    </div>
);
}