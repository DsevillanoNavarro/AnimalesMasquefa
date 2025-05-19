import { useState, useEffect } from 'react';
import axios from 'axios';

// Instancia de Axios configurada para enviar cookies
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

/**
 * Servicio: obtiene los datos del usuario autenticado
 * @returns {Promise<Object>} Usuario serializado
 */
export function fetchCurrentUser() {
  return api.get('me/').then(res => res.data);
}

/**
 * Hook: useCurrentUser
 * Combina la llamada al servicio fetchCurrentUser y maneja estado de carga y errores.
 */
export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchCurrentUser()
      .then(data => {
        if (mounted) setUser(data);
      })
      .catch(err => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading, error };
}
