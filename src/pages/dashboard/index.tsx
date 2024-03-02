import React, { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

export default function Dashboard() {
    const { Logout } = useContext(AuthContext)
    
    async function handleLogout(){
        await Logout();
    }

    return (
        <div>
            <h1>Tela de dashboard</h1>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}