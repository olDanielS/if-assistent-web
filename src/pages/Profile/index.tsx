import React from "react";

import Header from "../../components/Header";
import Title from "../../components/Title";

import {FiSettings} from 'react-icons/fi'

import './styles.css'

export default function Profile() {
 return (
   <div>
      <Header/>
      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={24}/>
        </Title>

      </div>
        <h1>Page profile</h1>
   </div>
 );
}