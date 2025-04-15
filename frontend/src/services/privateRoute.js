import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authContext';

const PrivateRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth(); // Accedemos a la autenticación

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Si no está autenticado, redirige al login
    }

    return element; // Si está autenticado, renderiza el componente solicitado
};

export default PrivateRoute;
