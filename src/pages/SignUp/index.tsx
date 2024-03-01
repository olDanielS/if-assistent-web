import React from "react";
import {useState} from 'react';
import '../Login/signin.css'

import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';


export default function SignUp() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    return (
        <div className="container-center">
            <div className="login">
                <div className="header-login">
                    <img src={logo} alt="logo" id="logo"/>
                </div>

                <form className="form-login">
                <h1>Nova conta</h1>
                    <input type="text" placeholder="Daniel Oliveira" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder="email@ifba.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="********" value={password}
                     onChange={(e) => setPassword(e.target.value)}/>

                    <button className="submit">Criar Conta</button>
                </form>

                <Link to="/">Já possui uma conta? <span>Entrar</span></Link>

            </div>
        </div>
    );
}