// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import HomeImage from '../frontComponents/HomeImage';
function Home() {
  return (
    <div>
      
      <HomeImage/>
      <h1>Bienvenido a la página de inicio</h1>
      <p>Esta es la página principal de nuestra aplicación.</p>
      <li><Link to="/about">Acerca de</Link></li>
      <li><Link to="/listadoanimales">Listado animales</Link></li>
      <li><Link to="/registro">Registro</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/listadonoticias">Listado Noticias</Link></li>
      <li><Link to="/crearnoticias">Crear Noticias</Link></li>
      <li><Link to="/logout">Cerrar sesion</Link></li>

    </div>
  );
}

export default Home;