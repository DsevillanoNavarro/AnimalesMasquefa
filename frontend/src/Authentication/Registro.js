import React, { useState } from 'react';
import UsuarioService from '../services/usuarioService';

const UsuarioForm = () => {
  const [formulario, setFormulario] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in formulario) {
      formData.append(key, formulario[key]);
    }

    try {
      await UsuarioService.createUsuario(formData);
      setMensaje('✅ Usuario creado correctamente');
      setFormulario({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setMensaje('❌ Hubo un error al crear el usuario');
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formulario.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="Nombre"
          value={formulario.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          value={formulario.last_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formulario.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formulario.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default UsuarioForm;
