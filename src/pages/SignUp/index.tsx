import React, {useContext, useState} from "react";
import '../Login/styles.css'

import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';

import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext);

    async function handleSignUp(e:any){
        e.preventDefault();
        if(!name || !email || ! password){
            alert("Ops, todos os campos precisam ser preenchidos")
        }

        await signUp({name, email, password})
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="header-login">
                    <img src={logo} alt="logo" id="logo"/>
                </div>

                <form className="form-login" onSubmit={handleSignUp}>
                <h1>Nova conta</h1>
                    <input type="text" placeholder="Daniel Oliveira" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder="email@ifba.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="********" value={password}
                     onChange={(e) => setPassword(e.target.value)}/>

                    <button className="submit">{loadingAuth ? "Loading..." : "Criar Conta"}</button>
                </form>

                <Link to="/">Já possui uma conta? <span>Entrar</span></Link>

            </div>
        </div>
    );
}