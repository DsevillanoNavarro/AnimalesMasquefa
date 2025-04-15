import React from 'react';
import ReactDOM from 'react-dom/client';  // Cambiar la importación de react-dom
import { BrowserRouter } from 'react-router-dom';  // Importamos BrowserRouter
import App from './App';
import { AuthProvider } from './services/authContext';  // Asegúrate de importar el AuthProvider

// Crear el "root" para React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos la aplicación en el "root"
root.render(
  <BrowserRouter>
    <AuthProvider>  {/* Aquí envolvemos el App con AuthProvider */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
