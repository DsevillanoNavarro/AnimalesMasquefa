// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/loginService';
import { useNavigate } from 'react-router-dom';
import { useLoading } from './LoadingContext'; // 👈 importar tu servicio de loading

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const { setLoading } = useLoading(); // 👈 obtener setLoading

  useEffect(() => {
    (async () => {
      setLoading(true); // 👈 empieza loading
      try {
        await api.post('/token/refresh/');
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // 👈 termina loading
      }
    })();
  }, []);

  const login = async (username, password) => {
    setLoading(true); // 👈 opcional, también podrías mostrar loading en login
    try {
      await api.post('/token/', { username, password });
      setIsAuthenticated(true);
      navigate('/', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    document.cookie = 'access_token=; Max-Age=0; path=/';
    document.cookie = 'refresh_token=; Max-Age=0; path=/';
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
