import React from "react";
import {useState} from 'react';
import './signin.css';

import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';


export default function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    return (
        <div className="container-center">
            <div className="login">
                <div className="header-login">
                    <img src={logo} alt="logo" id="logo"/>
                </div>

                <form className="form-login">
                <h1>Login</h1>
                    <input type="text" placeholder="email@ifba.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="********" value={password}
                     onChange={(e) => setPassword(e.target.value)}/>

                    <button className="submit">Acessar Conta</button>
                </form>

                <Link to="/register">Nõa possui uma conta? <span>Criar Conta</span></Link>

            </div>
        </div>
    );
}