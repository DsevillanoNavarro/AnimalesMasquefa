import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/loginService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [failedAttempts, setFailedAttempts] = useState(0);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reiniciar el error antes de intentar iniciar sesión
        try {
            const data = await loginService(username, password);
            console.log('Login successful:', data);
            
            // Guardar el token en localStorage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            
            // Redirigir al usuario a la página de inicio
            navigate('/');
        } catch (error) {
            setFailedAttempts(prev => prev + 1); // Incrementar el contador de intentos fallidos
            
            // Asegúrate de que el mensaje de error sea un string
            const errorMessage = error.response && error.response.data && error.response.data.detail
                ? error.response.data.detail
                : 'Error desconocido';
                
            setError(errorMessage); // Establecer el mensaje de error
            console.error('Error al iniciar sesión:', errorMessage);
            
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={failedAttempts >= 3}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
        </form>
    );
};

export default Login;