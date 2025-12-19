import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoutePaciente({ children }) {
  // Verificar si el paciente está logeado
  const isPacienteAuthenticated = () => {
    const pacienteLogeado = localStorage.getItem('pacienteLogeado');
    return pacienteLogeado !== null;
  };

  if (!isPacienteAuthenticated()) {
    // Redirigir al login de paciente
    return <Navigate to="/login-paciente" replace />;
  }

  return children;
}

export default ProtectedRoutePaciente;