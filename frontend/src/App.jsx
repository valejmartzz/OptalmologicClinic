import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar componentes de páginas
import Home from './pages/Home';
import Consultas from './pages/Consultas';
import Examenes from './pages/Examenes';
import Optometria from './pages/Optometria';
import Registro from './pages/Registro';
import PerfilPaciente from './pages/PerfilPaciente';
import Medico from './pages/Medico';
import Admin from './pages/Admin';
import LoginMedico from './pages/LoginMedico';
import LoginAdmin from './pages/LoginAdmin';
import LoginPaciente from './pages/LoginPaciente';
import ProtectedRoutePaciente from './components/ProtectedRoutePaciente';

// Importar páginas del módulo médico
import PacientesMedico from './pages/PacientesMedico';
import AgendarCitaMedico from './pages/AgendarCitaMedico';
import NotaMedica from './pages/NotaMedica';
import ReportesMedico from './pages/ReportesMedico';
import ConfigMedico from './pages/ConfigMedico';
import HistoriaClinica from './pages/HistoriaClinica';

// Importar componentes
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      {/* Navbar solo en rutas específicas */}
      <Routes>
        <Route path="/login-medico" element={<LoginMedico />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

// Layout principal con Navbar y Footer
function MainLayout() {
  const location = window.location.pathname;
  const showNavbarFooter = !['/login-medico', '/login-admin'].includes(location);
  
  return (
    <>
      {showNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/examenes" element={<Examenes />} />
        <Route path="/optometria" element={<Optometria />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<ProtectedRoutePaciente><PerfilPaciente /></ProtectedRoutePaciente>
} />
        
        {/* Rutas públicas del módulo médico */}
        <Route path="/login-medico" element={<LoginMedico />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-paciente" element={<LoginPaciente />} />
        
        {/* Rutas protegidas del médico */}
        <Route path="/medico" element={
          <ProtectedRoute tipo="medico">
            <Medico />
          </ProtectedRoute>
        } />
        
        <Route path="/pacientes-medico" element={
          <ProtectedRoute tipo="medico">
            <PacientesMedico />
          </ProtectedRoute>
        } />
        
        <Route path="/agendar-cita" element={
          <ProtectedRoute tipo="medico">
            <AgendarCitaMedico />
          </ProtectedRoute>
        } />
        
        <Route path="/nota-medica" element={
          <ProtectedRoute tipo="medico">
            <NotaMedica />
          </ProtectedRoute>
        } />
        
        <Route path="/reportes-medico" element={
          <ProtectedRoute tipo="medico">
            <ReportesMedico />
          </ProtectedRoute>
        } />
        
        <Route path="/config-medico" element={
          <ProtectedRoute tipo="medico">
            <ConfigMedico />
          </ProtectedRoute>
        } />
        
        <Route path="/historia-clinica/:pacienteId" element={
          <ProtectedRoute tipo="medico">
            <HistoriaClinica />
          </ProtectedRoute>
        } />
        
        {/* Ruta protegida del admin */}
        <Route path="/admin" element={
          <ProtectedRoute tipo="admin">
            <Admin />
          </ProtectedRoute>
        } />
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showNavbarFooter && <Footer />}
    </>
  );
}

export default App;