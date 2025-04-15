import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiar de useHistory a useNavigate

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

    useEffect(() => {
        // Verifica si hay un token guardado en localStorage
        const token = localStorage.getItem('access_token');
        if (token) {
            // Aquí puedes agregar la lógica para validar el token
            validateToken(token);
        } else {
            setIsAuthenticated(false); // Si no hay token, no está autenticado
        }
    }, []);

    const validateToken = (token) => {
        // Aquí puedes hacer una llamada a tu API para validar el token
        // Por ejemplo, podrías hacer una solicitud a un endpoint de verificación
        fetch('/api/token/verify/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                setIsAuthenticated(true); // Si el token es válido, el usuario está autenticado
            } else {
                setIsAuthenticated(false); // Si el token no es válido, no está autenticado
                localStorage.removeItem('access_token'); // Eliminar el token si no es válido
                navigate('/login'); // Redirigir al login
            }
        })
        .catch(error => {
            console.error('Error al validar el token:', error);
            setIsAuthenticated(false); // Si hay un error, no está autenticado
            localStorage.removeItem('access_token'); // Eliminar el token en caso de error
            navigate('/login'); // Redirigir al login
        });
    };

    const login = (token) => {
        localStorage.setItem('access_token', token); // Guardamos el token en localStorage
        setIsAuthenticated(true); // Marcamos al usuario como autenticado
    };

    const logout = () => {
        localStorage.removeItem('access_token'); // Eliminamos el token al hacer logout
        setIsAuthenticated(false); // Marcamos al usuario como no autenticado
        navigate('/login'); // Redirigimos al login usando useNavigate
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext); // Nos permite acceder al contexto de autenticación
};