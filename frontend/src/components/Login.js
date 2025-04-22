import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/loginService';
import { useAuth } from '../services/authContext';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [failedAttempts, setFailedAttempts] = useState(0);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { access, refresh } = await loginService(form.username, form.password);
            localStorage.setItem('refresh_token', refresh);
            login(access, refresh);
            navigate('/');
        } catch (error) {
            setFailedAttempts((prev) => prev + 1);
            const errorMessage = error.response?.data?.detail || 'Error desconocido';
            setError(errorMessage);
            console.error('Error al iniciar sesión:', errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={failedAttempts >= 3}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Login;
