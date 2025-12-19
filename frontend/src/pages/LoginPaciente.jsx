import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Database from '../data/database';

function LoginPaciente() {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [registroData, setRegistroData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    fechaNacimiento: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistroChange = (e) => {
    const { name, value } = e.target;
    setRegistroData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Buscar paciente por email
    const pacientes = Database.getPacientes();
    const pacienteEncontrado = pacientes.find(p => p.email === credenciales.email);
    
    if (!pacienteEncontrado) {
      setError('Usuario no encontrado. Regístrese o verifique su email.');
      return;
    }
    
    // En una app real, aquí verificaríamos la contraseña con hash
    // Por ahora, solo verificamos que haya un paciente con ese email
    if (!pacienteEncontrado.password) {
      // Si el paciente no tiene contraseña (fue creado por un médico),
      // le pedimos que la cree
      setMostrarRegistro(true);
      setRegistroData(prev => ({
        ...prev,
        email: credenciales.email,
        nombre: pacienteEncontrado.nombre || '',
        telefono: pacienteEncontrado.telefono || '',
        fechaNacimiento: pacienteEncontrado.fechaNacimiento || ''
      }));
      setError('Complete su registro para crear una contraseña');
      return;
    }
    
    // Guardar paciente en localStorage como logeado
    localStorage.setItem('pacienteLogeado', JSON.stringify(pacienteEncontrado));
    
    // Redirigir al perfil
    navigate('/perfil');
  };

  const handleRegistroSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (registroData.password !== registroData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (registroData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Buscar si el paciente ya existe
    const pacientes = Database.getPacientes();
    let pacienteExistente = pacientes.find(p => p.email === registroData.email);
    
    if (pacienteExistente) {
      // Actualizar paciente existente con contraseña
      Database.updatePaciente(pacienteExistente.id, {
        ...pacienteExistente,
        password: registroData.password, // En realidad debería ser un hash
        nombre: registroData.nombre || pacienteExistente.nombre,
        telefono: registroData.telefono || pacienteExistente.telefono,
        fechaNacimiento: registroData.fechaNacimiento || pacienteExistente.fechaNacimiento
      });
      
      pacienteExistente = Database.getPacientes().find(p => p.id === pacienteExistente.id);
    } else {
      // Crear nuevo paciente
      const nuevoPaciente = {
        nombre: registroData.nombre,
        email: registroData.email,
        password: registroData.password,
        telefono: registroData.telefono,
        fechaNacimiento: registroData.fechaNacimiento,
        fechaRegistro: new Date().toISOString().split('T')[0],
        tipoSangre: '',
        alergias: '',
        enfermedadesCronicas: ''
      };
      
      Database.addPaciente(nuevoPaciente);
      pacienteExistente = Database.getPacientes().find(p => p.email === registroData.email);
    }
    
    // Guardar en localStorage y redirigir
    localStorage.setItem('pacienteLogeado', JSON.stringify(pacienteExistente));
    navigate('/perfil');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            backgroundColor: '#e3f2fd',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '2rem',
            color: '#2563eb'
          }}>
            👤
          </div>
          
          {mostrarRegistro ? (
            <>
              <h1 style={{ color: '#1e293b', margin: '0 0 0.5rem', fontSize: '1.8rem' }}>
                Complete su Registro
              </h1>
              <p style={{ color: '#64748b', margin: 0 }}>
                Cree su contraseña para acceder a su perfil
              </p>
            </>
          ) : (
            <>
              <h1 style={{ color: '#1e293b', margin: '0 0 0.5rem', fontSize: '1.8rem' }}>
                Acceso Paciente
              </h1>
              <p style={{ color: '#64748b', margin: 0 }}>
                Ingrese con su email para ver sus citas
              </p>
            </>
          )}
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {!mostrarRegistro ? (
          // FORMULARIO DE LOGIN
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={credenciales.email}
                onChange={handleLoginChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="ejemplo@email.com"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={credenciales.password}
                onChange={handleLoginChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="••••••••"
              />
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                Si es su primera vez, deje en blanco y complete el registro
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '1rem',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Ingresar
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                ¿No tiene una cita aún?
              </p>
              <button 
                type="button"
                onClick={() => navigate("/consultas")}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
              >
                Agendar Primera Cita
              </button>
            </div>
          </form>
        ) : (
          // FORMULARIO DE REGISTRO/COMPLETAR PERFIL
          <form onSubmit={handleRegistroSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={registroData.nombre}
                onChange={handleRegistroChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="Juan Pérez"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={registroData.email}
                onChange={handleRegistroChange}
                required
                disabled={credenciales.email !== ''}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc',
                  opacity: credenciales.email !== '' ? 0.7 : 1
                }}
                placeholder="ejemplo@email.com"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={registroData.telefono}
                onChange={handleRegistroChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="555-123-4567"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={registroData.fechaNacimiento}
                onChange={handleRegistroChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Contraseña *
              </label>
              <input
                type="password"
                name="password"
                value={registroData.password}
                onChange={handleRegistroChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={registroData.confirmPassword}
                onChange={handleRegistroChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="Repita su contraseña"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setMostrarRegistro(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#e2e8f0',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
              >
                Completar Registro
              </button>
            </div>
          </form>
        )}

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid #e2e8f0' 
        }}>
          <button 
            type="button"
            onClick={() => navigate("/")}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '0.9rem',
              textDecoration: 'underline'
            }}
          >
            ← Volver al inicio
          </button>
        </div>

        {/* Información para prueba */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#0369a1',
          textAlign: 'center'
        }}>
          <strong>📝 Para probar:</strong> Use el email de cualquier paciente creado por un médico, o regístrese como nuevo.
        </div>
      </div>
    </div>
  );
}

export default LoginPaciente;