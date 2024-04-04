import React from "react";
import './modal.css';

import { FiX } from 'react-icons/fi'


export default function Modal({content, close}) {
  return (
    <div className="modal">
      <div className="container">
        <button className="btnClose" onClick={() => close()}>
          <FiX size={25} color="#FFF" />

        </button>

        <main >
          <h2>Detalhes do chamado</h2>
          <div className="row">
            <span>
              Usuário: <i>{content.name}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Cadastrado em : <i>04/04/2024</i>
            </span>
            <span>
              Equipamento: <i>{content.equip}</i>
            </span>
          </div>
          <div className="row">
            <span >
              Status: <i style={{color: "#FFF", borderRadius: 4, padding:4, backgroundColor: content.status == "Aberto" ? "#02945D" : "#d6a935"}}>{content.status} </i>
            </span>
            <span>
              Laboratorio: <i>{content.lab}</i>
            </span>
          </div>
          <>
            <h3>Descrição</h3>
            <p>{content.description}</p>
          </>

        </main>
      </div>
    </div>
  );
}