import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListadoAnimales from './pages/ListadoAnimales';
import EditarAnimales from './pages/EditarAnimales';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ListadoNoticias from './pages/ListadoNoticias';
import Animales from './pages/Animales';
import Noticias from './pages/Noticias';
import Contacto from './pages/Contacto';
import PrivateRoute from './services/privateRoute';
import NotFound from './pages/NotFound';
import SobreNosotros from './pages/SobreNosotros';
import Footer from './HomeComponents/Footer';
import Navbar from './HomeComponents/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import GlobalLoader from './LoadingComponents/GlobalLoader';

function AppContent() {
  const { loading } = useLoading();

  useEffect(() => {
    if (loading) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  }, [loading]);

  return (
    <>
      <GlobalLoader />
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animales" element={<Animales />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/sobrenosotros" element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/listadoanimales" element={<PrivateRoute element={<ListadoAnimales />} />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/editar/:id" element={<PrivateRoute element={<EditarAnimales />} />} />
            <Route path="/listadoNoticias" element={<PrivateRoute element={<ListadoNoticias />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
