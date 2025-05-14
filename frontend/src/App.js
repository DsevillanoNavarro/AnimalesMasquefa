import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import NotFound from './pages/NotFound';
import SobreNosotros from './pages/SobreNosotros';
import Footer from './HomeComponents/Footer';
import Navbar from './HomeComponents/Navbar';
import DetalleAnimal from "./pages/DetalleAnimal";
import DetalleNoticias from "./pages/DetalleNoticias";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import GlobalLoader from './LoadingComponents/GlobalLoader';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { api } from './services/loginService';
// Guard para rutas privadas
function RequireAuth() {
  const [allowed, setAllowed] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        // Intentamos refrescar el token usando la cookie
        await api.post('/api/token/refresh/');
        setAllowed(true);
      } catch {
        setAllowed(false);
      }
    })();
  }, []);

  if (allowed === null) {
    // Mientras comprobamos la cookie
    return <p>Cargando sesión…</p>;
  }

  return allowed ? <Outlet /> : <Navigate to="/login" replace />;
}



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
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/animales" element={<Animales />} />
            <Route path="/animales/:id" element={<DetalleAnimal />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<DetalleNoticias />} />
            <Route path="/sobrenosotros" element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            {/* Agrupamos rutas protegidas bajo el guard */}
            <Route element={<RequireAuth />}>
              <Route path="/listadoanimales" element={<ListadoAnimales />} />
              <Route path="/editar/:id" element={<EditarAnimales />} />
              <Route path="/listadoNoticias" element={<ListadoNoticias />} />
            </Route>

            {/* Catch-all */}
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
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;