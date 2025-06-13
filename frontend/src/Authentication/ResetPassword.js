import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ResetPassword.css';
import { api } from '../services/loginService';

export default function ResetPassword() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const validarPassword = (password) => ({
    largo: password.length >= 8,
    mayuscula: /[A-Z]/.test(password),
    numero: /\d/.test(password)
  });

  const validaciones = validarPassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setTipoMensaje('');
    setLoading(true);

    try {
      const res = await api.post('/password-reset-confirm/', {
        uidb64,
        token,
        new_password: password
      });
      setMensaje(res.data.detail || 'Contraseña cambiada correctamente.');
      setTipoMensaje('success');
    } catch (err) {
      const detalle = err.response?.data?.detail || 'Error inesperado';
      setMensaje(detalle);
      setTipoMensaje('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container slide-down-fade">
      <h2 className="login-title">Restablecer contraseña</h2>

      {mensaje && (
        <p className={`alert-message ${tipoMensaje === 'error' ? 'alert-error' : 'alert-success'}`}>
          {mensaje}
        </p>
      )}

      {tipoMensaje === 'success' ? (
        <div className="login-links">
          <Link to="/login" className="login-link">
            👉 Inicia sesión ahora
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="login-input"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <ul className="password-checklist">
            <li className={validaciones.largo ? 'valid' : 'invalid'}>
              {validaciones.largo ? '✅' : '❌'} Al menos 8 caracteres
            </li>
            <li className={validaciones.mayuscula ? 'valid' : 'invalid'}>
              {validaciones.mayuscula ? '✅' : '❌'} Al menos una letra mayúscula
            </li>
            <li className={validaciones.numero ? 'valid' : 'invalid'}>
              {validaciones.numero ? '✅' : '❌'} Al menos un número
            </li>
          </ul>

          <button
            type="submit"
            className="login-btn"
            disabled={loading || !Object.values(validaciones).every(Boolean)}
          >
            {loading ? 'Enviando...' : 'Cambiar contraseña'}
          </button>
        </form>
      )}

      <div className="login-links">
        <Link to="/login" className="login-link">
          ¿Recordaste tu contraseña? Inicia sesión
        </Link>
      </div>
    </div>
  );
}
