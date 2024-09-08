import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiPlus } from "react-icons/fi";
import './new.css'

import {  useNavigate } from 'react-router-dom'

import { db } from '../../services/firebaseConnect';
import {collection, getDocs, doc, updateDoc, query, where} from "firebase/firestore";

import { toast } from 'react-toastify';

interface DocumentData {
    uid: string,
    name: string;
    email: string;
    isAdmin: string;
    activity: string;

}


const listRef = collection(db, "users");

export default function RemoveAuthorization() {
    const [users, setUsers] = useState<DocumentData[]>([]);

   
    const [updatedUser, setUpdatedUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEmply, setIsEmply] = useState(false);

    useEffect(() => {
        async function loadTickets() {
            const consult = query(listRef, where("activity", "==", true));

            const consultSnapshot = await getDocs(consult);
            setUsers([])
            await updateState(consultSnapshot)

            setLoading(false)
        }
        
        loadTickets();
    
        return () => { }
    },
        [updatedUser])

        async function updateState(consultSnapshot) {
            const isCollectionEmpty = consultSnapshot.size === 0;
    
            if (!isCollectionEmpty) {
                let list: DocumentData[] = [];
    
                consultSnapshot.forEach((doc) => {
                    const data = doc.data() as DocumentData;
                    
                    list.push({
                        uid: data.uid,
                        name: data.name,
                        email: data.email,
                        isAdmin: data.isAdmin,
                        activity: data.activity,
    
                    });
                });
                const lastDoc= consultSnapshot.docs[consultSnapshot.docs.length - 1]
                
                setUsers(user => [...user, ...list]);
               
    
            } else {
                setIsEmply(true)
            }

        }

        async function handleRegister(user) {
          if (user) {
      
              const docRef = doc(db, "users", user.uid);
              
              await updateDoc(docRef, {
                 activity: false
                  
  
              }).then(() => {
                  toast.info(`${user.name} - Desativado!`);
                  setUpdatedUser(!updatedUser);
                  
  
          }).catch((error) => {
              toast.error("Ops, erro ao atualizar a solicitação")
              
          })
  
          return;
      }
    }

    const navigate = useNavigate();

return (
    <div>
        <Header />

        <div className="content">
            <Title name="Revogação de acesso">
                <FiPlus size={24} />
            </Title>

            <div className="container">
            <div>
      {users.length > 0 ? (
      
        users.map((user, index) => (
          <div 
            key={index} 
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            
              
            </div>
            <button onClick={() =>{handleRegister(user)}}
                style={{
                    border: "none",
                    padding: '10px',
                    borderRadius: "7px",
                    backgroundColor:"#EF463A",
                    color: "#fff",
                    fontWeight:'bold'
                  }}
                >
              Desativar perfil
            </button>
          </div>
        ))
      ) : (
        <p>Nenhum usuário para ser listado.</p>
      )}
    </div>
            </div>
        </div>
    </div>
);
}