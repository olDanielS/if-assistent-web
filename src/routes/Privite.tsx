import { useContext } from 'react';

import { AuthContext } from '../contexts/auth';
import { Navigate } from 'react-router-dom';

export default function Privete({ children }) {

    const { signed, loading } = useContext(AuthContext);
    console.log(signed)

    if (loading) {
        return (
            <div>

            </div>
        )
    }

    if (!signed) {
        return <Navigate to="/" />
    }
    return children;
}
