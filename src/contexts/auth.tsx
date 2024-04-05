import React, { useState, useEffect, createContext } from "react";

import { auth, db } from '../services/firebaseConnect';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


interface UserProps {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
}
export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            const storangeUser = localStorage.getItem("@tickets")

            if (storangeUser) {
                setUser(JSON.parse(storangeUser))
                setLoading(false);
            }
            setLoading(false);

        }

        loadData();
    }, [])


    async function signIn({ email, password }: UserProps) {
        setLoadingAuth(true)
        console.log({ email, password })


        await signInWithEmailAndPassword(auth, email, password).then(async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef)

            console.log(docSnap.data())
            let data = {
                uid: uid,
                name: docSnap.data.name,
                email: value.user.email,
                avatarUrl: null,
            }
            
            const validateUser = docSnap.data();
            if (validateUser&& validateUser.isAdmin === false) {
                toast.error("Você não possui permissão para acessar essa parte do sistema")
                setLoadingAuth(false)
                return
            }

            setUser(data)
            storangeUser(data)
            toast.success("Sucesso")
            navigate("/dashboard")
            setLoadingAuth(false)

        }).catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    toast.error("Verifique seu email e tente novamente");
                    break;
                case "auth/user-not-found":
                    toast.error("Usuário não encontrado");
                    break;
                default:
                    toast.error("Ocorreu um erro ao tentar autenticar. Por favor, tente novamente mais tarde.");
                    
            }

            setLoadingAuth(false);
            
        })

    }


    async function Logout() {
        await signOut(auth);
        localStorage.removeItem("@tickets");
        setUser(null)
    }


    async function signUp({ name, email, password }: UserProps) {
        setLoadingAuth(true)
        console.log({ name, email })

        await createUserWithEmailAndPassword(auth, email, password).then(async (value) => {
            let uid = value.user.uid;

            await setDoc(doc(db, "users", uid), {
                name: name,
                avatarUrl: null,
                isAdmin: false,
            }).then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    
                    avatarUrl: null
                }
                setUser(data)
                storangeUser(data)
                navigate("/dashboard")
                toast.success("Sucesso")
                setLoadingAuth(false)
            })
        }).catch((error) => {
            switch (error.code) {
                case "auth/email-already-in-use":
                    toast.error("O endereço de e-mail já está sendo usado por outra conta.");
                    break;
                case "auth/weak-password":
                    toast.error("A senha é muito fraca. Tente uma senha mais forte. No minimo 6 digitos");
                    break;
                case "auth/invalid-email":
                    toast.error("O endereço de e-mail é inválido.");
                    break;
                default:
                    toast.error("Ocorreu um erro ao tentar criar a conta. Por favor, tente novamente mais tarde.");
                    console.error("Erro ao criar conta:", error);
            }
            console.log(error);
            setLoadingAuth(false)
        })
    }

    function storangeUser(data) {
        localStorage.setItem("@tickets", JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            Logout,
            loadingAuth,
            loading,


        }}>
            {children}
        </AuthContext.Provider>
    )
}