// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/loginService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = «no sé aún»
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Intentamos refrescar el access_token usando el refresh_token en cookie
        await api.post('/api/token/refresh/');
        setIsAuthenticated(true);
      } catch {
        // Solo actualizamos el estado: no redirigimos aquí
        setIsAuthenticated(false);
      }
    })();
  }, []); // Quítale navigate de la dependencia para que no se vuelva a ejecutar

  const login = async (username, password) => {
    // Al hacer login, el backend fija ambas cookies en la respuesta
    await api.post('/api/token/', { username, password });
    setIsAuthenticated(true);
    navigate('/', { replace: true });
  };

  const logout = () => {
    // Borramos cookies client‑side y devolvemos a login
    document.cookie = 'access_token=; Max-Age=0; path=/';
    document.cookie = 'refresh_token=; Max-Age=0; path=/';
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  // Mientras isAuthenticated === null, mostramos un loading…
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {isAuthenticated === null 
        ? <p>Cargando sesión…</p>
        : children
      }
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
