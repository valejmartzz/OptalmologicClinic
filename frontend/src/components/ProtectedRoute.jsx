import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, tipo }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay sesión guardada
    if (tipo === 'medico') {
      const medico = localStorage.getItem('medicoLogeado');
      setIsAuthenticated(!!medico);
    } else if (tipo === 'admin') {
      const admin = localStorage.getItem('adminLogeado');
      setIsAuthenticated(!!admin);
    }
    setLoading(false);
  }, [tipo]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#3498db'
      }}>
        Verificando acceso...
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirigir al login correspondiente
    if (tipo === 'medico') {
      return <Navigate to="/login-medico" />;
    } else if (tipo === 'admin') {
      return <Navigate to="/login-admin" />;
    }
  }

  return children;
}

export default ProtectedRoute;