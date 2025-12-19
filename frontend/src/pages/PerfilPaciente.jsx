import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Database from '../data/database';

function PerfilPaciente() {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [citas, setCitas] = useState([]);
  const [historialMedico, setHistorialMedico] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  // Obtener paciente logeado
  const pacienteLogeado = JSON.parse(localStorage.getItem('pacienteLogeado'));
  
  if (!pacienteLogeado) {
    // Si no hay paciente logeado, redirigir al login
    navigate('/login-paciente');
    return;
  }
  
  setPaciente(pacienteLogeado);
  
  // Obtener citas del paciente
  const citasPaciente = Database.getCitasPorPaciente(pacienteLogeado.id);
  setCitas(citasPaciente);
  
  // Obtener historial médico
  const historial = Database.getNotasPorPaciente(pacienteLogeado.id);
  setHistorialMedico(historial);
  
  setLoading(false);
}, [navigate]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando perfil...</div>;
  }

  if (!paciente) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>No se encontró el paciente</div>;
  }

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: 'white',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ← Volver al Inicio
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#e3f2fd',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              👤
            </div>
            <div>
              <h1 style={{ color: '#1e293b', margin: 0 }}>{paciente.nombre}</h1>
              <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>
                Paciente • {paciente.edad} años • {paciente.tipoSangre}
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Columna izquierda - Información personal */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem' }}>Información Personal</h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>📧 Email</div>
                <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.email}</div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>📱 Teléfono</div>
                <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.telefono}</div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>📍 Dirección</div>
                <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.direccion}</div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>📅 Fecha de Registro</div>
                <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.fechaRegistro}</div>
              </div>
            </div>

            {/* Información médica */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem' }}>Información Médica</h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>🩸 Tipo de Sangre</div>
                <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.tipoSangre}</div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>⚠️ Alergias</div>
                <div style={{ 
                  color: paciente.alergias === 'Ninguna' ? '#2ecc71' : '#e74c3c', 
                  fontWeight: '500' 
                }}>
                  {paciente.alergias}
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>🏥 Enfermedades Crónicas</div>
                <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.enfermedadesCronicas}</div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Citas e historial */}
          <div>
            {/* Citas programadas */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: '#1e293b', margin: 0 }}>📅 Mis Citas</h2>
                <button 
                  onClick={() => navigate('/consultas')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  + Nueva Cita
                </button>
              </div>
              
              {citas.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  No tienes citas programadas
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b' }}>Fecha</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b' }}>Hora</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b' }}>Tipo</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b' }}>Médico</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b' }}>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {citas.map((cita, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.75rem', color: '#1e293b', fontWeight: '500' }}>{cita.fecha}</td>
                          <td style={{ padding: '0.75rem', color: '#475569' }}>{cita.hora}</td>
                          <td style={{ padding: '0.75rem', color: '#475569' }}>{cita.tipo}</td>
                          <td style={{ padding: '0.75rem', color: '#475569' }}>{cita.medicoNombre}</td>
                          <td style={{ padding: '0.75rem' }}>
                            <span style={{
                              padding: '0.3rem 0.8rem',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              fontWeight: 'bold',
                              backgroundColor: 
                                cita.estado === 'Confirmada' ? '#d4edda' :
                                cita.estado === 'Pendiente' ? '#fff3cd' : '#f8d7da',
                              color: 
                                cita.estado === 'Confirmada' ? '#155724' :
                                cita.estado === 'Pendiente' ? '#856404' : '#721c24'
                            }}>
                              {cita.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Historial médico */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem' }}>📋 Historial Médico</h2>
              
              {historialMedico.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  No hay registros médicos
                </div>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {historialMedico.map((nota, index) => (
                    <div 
                      key={index} 
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: '#f8fafc'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{nota.fecha}</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Dr. {nota.medicoNombre}</div>
                      </div>
                      
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Motivo:</div>
                        <div style={{ color: '#475569' }}>{nota.motivo}</div>
                      </div>
                      
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Diagnóstico:</div>
                        <div style={{ color: '#475569' }}>{nota.diagnostico}</div>
                      </div>
                      
                      {nota.medicamentos.length > 0 && (
                        <div style={{ marginBottom: '0.5rem' }}>
                          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Medicamentos:</div>
                          <ul style={{ margin: '0.25rem 0 0 1.5rem', color: '#475569' }}>
                            {nota.medicamentos.map((med, idx) => (
                              <li key={idx}>{med}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PerfilPaciente;