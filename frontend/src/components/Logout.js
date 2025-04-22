import React from 'react';
import { useAuth } from '../services/authContext'; // Ajusta el path si es necesario

const LogoutButton = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout}>
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;
