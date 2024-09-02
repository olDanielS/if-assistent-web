import React, {useContext} from 'react';

import './styles.css'
import logo from '../../assets/logo.png'
import {FiHome, FiUser, FiSettings, FiBook, FiAward, FiXCircle} from 'react-icons/fi'

import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

export default function Header() {

    const {user, Logout}:any = useContext(AuthContext);


    return (
   <div className='sidebar'>
    
     <div>
            <img src={logo} alt="logo do sistema"/>
        </div>
    
        <Link to="/dashboard">
            <FiHome color='#FFF' size={24}/>
            Home
        </Link>
    
        <Link to="/authorizations">
            <FiUser color='#FFF' size={24}/>
            Aguardando aprovação
        </Link>
        <Link to="/faqs">
            <FiAward color='#FFF' size={24}/>
            FAQS
        </Link>
       
        <Link to="" onClick={async() => await Logout() }>
            <FiXCircle color='#FFF' size={24}/>
            Sair
        </Link>

   </div>
 );
}

/*<Link to="/profile">
            <FiSettings color='#FFF' size={24}/>
            Perfil
        </Link> */