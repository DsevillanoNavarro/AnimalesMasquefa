import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext'; // 👈 Importar el proveedor de carga

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <LoadingProvider> {/* 👈 Envolver con LoadingProvider */}
        <App />
      </LoadingProvider>
    </AuthProvider>
  </BrowserRouter>
);
