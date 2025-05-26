import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';
import { api } from '../services/loginService';

export default function ResetPassword() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validar = () => {
    if (
      !password ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      return 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.';
    }
    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setFormError('');

    const errorMsg = validar();
    if (errorMsg) {
      setFormError(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/password-reset-confirm/', {
        uidb64,
        token,
        new_password: password
      });
      setMessage(res.data.detail || 'Contraseña cambiada correctamente.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container slide-down-fade">
      <h2 className="login-title">Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="login-input"
          placeholder="Nueva contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {formError && <p className="login-error">{formError}</p>}

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Cambiar contraseña'}
        </button>
      </form>
      {error && <p className="login-error">{error}</p>}
      {message && <p className="login-success">{message}</p>}
      <div className="login-links">
        <a href="/login" className="login-link">
          ¿Recordaste tu contraseña? Inicia sesión
        </a>
      </div>
    </div>
  );
}
