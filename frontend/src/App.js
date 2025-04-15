import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ListadoAnimales from './pages/ListadoAnimales';
import EditarAnimales from './pages/EditarAnimales';
import Registro from './pages/Registro';
import Login from './pages/Login';
import ListadoNoticias from './pages/ListadoNoticias';
import PrivateRoute from './services/privateRoute';

function App() {
  return (
    <div>
      <h1>Mi Aplicación React</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listadoanimales" element={<PrivateRoute element={<ListadoAnimales />} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editar/:id" element={<PrivateRoute element={<EditarAnimales />} />} />
        <Route path="/listadoNoticias" element={<PrivateRoute element={<ListadoNoticias />} />} />
      </Routes>
    </div>
  );
}

export default App;
