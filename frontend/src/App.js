import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ListadoAnimales from './pages/ListadoAnimales';
import EditarAnimales from './pages/EditarAnimales';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ListadoNoticias from './pages/ListadoNoticias';
import PrivateRoute from './services/privateRoute';
import NotFound from './pages/NotFound';
import Footer from './frontComponents/Footer'; 
import Navbar from './frontComponents/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      {/* Contenido principal */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listadoanimales" element={<PrivateRoute element={<ListadoAnimales />} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/editar/:id" element={<PrivateRoute element={<EditarAnimales />} />} />
          <Route path="/listadoNoticias" element={<PrivateRoute element={<ListadoNoticias />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer siempre abajo */}
      <Footer />
    </div>
  );
}

export default App;
