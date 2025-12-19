import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Medico() {
  const navigate = useNavigate();
  
  const [pacientes, setPacientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [citasHoy, setCitasHoy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hoy');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener información del médico logeado
    const medicoLogeado = JSON.parse(localStorage.getItem('medicoLogeado'));
    
    if (!medicoLogeado) {
      navigate('/login-medico');
      return;
    }
    
    setUsuario(medicoLogeado);

    // Simular datos de API
    setTimeout(() => {
      setPacientes([
        { id: 1, nombre: "Ana García", edad: 34, ultimaVisita: "2024-03-10", proximaCita: "2024-04-15", email: "ana@email.com", telefono: "555-0101" },
        { id: 2, nombre: "Carlos Rodríguez", edad: 45, ultimaVisita: "2024-03-12", proximaCita: "2024-04-20", email: "carlos@email.com", telefono: "555-0102" },
        { id: 3, nombre: "María López", edad: 28, ultimaVisita: "2024-03-15", proximaCita: "2024-04-18", email: "maria@email.com", telefono: "555-0103" },
        { id: 4, nombre: "Juan Martínez", edad: 62, ultimaVisita: "2024-03-08", proximaCita: "2024-04-10", email: "juan@email.com", telefono: "555-0104" },
        { id: 5, nombre: "Laura Sánchez", edad: 39, ultimaVisita: "2024-03-18", proximaCita: "2024-04-22", email: "laura@email.com", telefono: "555-0105" },
        { id: 6, nombre: "Pedro Hernández", edad: 51, ultimaVisita: "2024-03-20", proximaCita: "2024-04-25", email: "pedro@email.com", telefono: "555-0106" },
      ]);

      setCitas([
        { id: 1, paciente: "Ana García", hora: "9:00", fecha: "2024-04-01", tipo: "Control", estado: "Confirmada", doctor: "Dr. Carlos Méndez" },
        { id: 2, paciente: "Carlos Rodríguez", hora: "10:30", fecha: "2024-04-01", tipo: "Consulta", estado: "Confirmada", doctor: "Dra. Ana Rodríguez" },
        { id: 3, paciente: "María López", hora: "11:45", fecha: "2024-04-02", tipo: "Examen", estado: "Pendiente", doctor: "Dr. Luis Fernández" },
        { id: 4, paciente: "Juan Martínez", hora: "14:00", fecha: "2024-04-02", tipo: "Revisión", estado: "Confirmada", doctor: "Dr. Roberto Sánchez" },
        { id: 5, paciente: "Laura Sánchez", hora: "15:30", fecha: "2024-04-03", tipo: "Control", estado: "Cancelada", doctor: "Dra. María González" },
        { id: 6, paciente: "Pedro Hernández", hora: "16:45", fecha: "2024-04-03", tipo: "Consulta", estado: "Confirmada", doctor: "Dr. Javier López" },
      ]);

      setCitasHoy([
        { id: 1, paciente: "Ana García", hora: "9:00", tipo: "Control", estado: "Confirmada", pacienteId: 1 },
        { id: 2, paciente: "Carlos Rodríguez", hora: "10:30", tipo: "Consulta", estado: "Confirmada", pacienteId: 2 },
        { id: 3, paciente: "María López", hora: "11:45", tipo: "Examen", estado: "Pendiente", pacienteId: 3 },
      ]);

      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('medicoLogeado');
    navigate('/login-medico');
  };

  const handleVerHistoria = (pacienteId) => {
    navigate(`/historia-clinica/${pacienteId}`);
  };

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
        Cargando panel médico...
      </div>
    );
  }

  return (
    <main style={{ 
      padding: "2rem", 
      minHeight: "100vh",
      backgroundColor: "#f8fafc"
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <button 
          onClick={() => navigate("/")}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "white",
            color: "#475569",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: "500",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
          }}
        >
          ← Volver al Inicio
        </button>
        
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h1 style={{ 
            color: "#1e293b", 
            margin: 0,
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem"
          }}>
            <span style={{
              backgroundColor: "#2ecc71",
              width: "45px",
              height: "45px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}>
              👨‍⚕️
            </span>
            Panel Médico
          </h1>
          <p style={{ 
            color: "#64748b", 
            margin: "0.5rem 0 0",
            fontSize: "1rem"
          }}>
            Gestión de pacientes y citas médicas
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ color: "#64748b" }}>👤</span>
            <span style={{ color: "#1e293b", fontWeight: "500" }}>
              {usuario ? usuario.nombre : 'Médico'}
            </span>
          </div>
          
          <button 
            onClick={handleLogout}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c0392b"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e74c3c"}
          >
            <span>🚪</span>
            Salir
          </button>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderLeft: '4px solid #3498db'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
            {pacientes.length}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Pacientes Activos</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderLeft: '4px solid #2ecc71'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>
            {citasHoy.length}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Citas Hoy</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderLeft: '4px solid #e74c3c'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
            2
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Urgencias</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderLeft: '4px solid #f39c12'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
            15
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Pendientes</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem',
        marginBottom: '2rem',
        backgroundColor: 'white',
        padding: '0.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <button
          onClick={() => setActiveTab('hoy')}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: activeTab === 'hoy' ? '#3498db' : 'transparent',
            color: activeTab === 'hoy' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
        >
          📅 Citas de Hoy
        </button>
        <button
          onClick={() => setActiveTab('pacientes')}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: activeTab === 'pacientes' ? '#3498db' : 'transparent',
            color: activeTab === 'pacientes' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
        >
          👥 Todos los Pacientes
        </button>
        <button
          onClick={() => setActiveTab('citas')}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: activeTab === 'citas' ? '#3498db' : 'transparent',
            color: activeTab === 'citas' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
        >
          📋 Todas las Citas
        </button>
      </div>

      {/* Contenido según Tab */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        minHeight: '400px'
      }}>
        {activeTab === 'hoy' && (
          <div>
            <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Citas Programadas para Hoy</h2>
            {citasHoy.length === 0 ? (
              <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>
                No hay citas programadas para hoy
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Hora</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Paciente</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Tipo</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Estado</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citasHoy.map((cita) => (
                      <tr key={cita.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem', color: '#1e293b', fontWeight: '500' }}>{cita.hora}</td>
                        <td style={{ padding: '1rem', color: '#1e293b' }}>{cita.paciente}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{cita.tipo}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.3rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            backgroundColor: cita.estado === 'Confirmada' ? '#d4edda' : '#fff3cd',
                            color: cita.estado === 'Confirmada' ? '#155724' : '#856404'
                          }}>
                            {cita.estado}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button 
                            onClick={() => handleVerHistoria(cita.pacienteId)}
                            style={{
                              padding: '0.4rem 0.8rem',
                              backgroundColor: '#3498db',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.85rem'
                            }}
                          >
                            Ver Historia
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pacientes' && (
          <div>
            <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Todos los Pacientes</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {pacientes.map((paciente) => (
                <div key={paciente.id} style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      backgroundColor: '#e3f2fd',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      👤
                    </div>
                    <div>
                      <h3 style={{ margin: 0, color: '#1e293b' }}>{paciente.nombre}</h3>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Edad: {paciente.edad} años</p>
                    </div>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Última Visita</div>
                      <div style={{ color: '#475569', fontWeight: '500' }}>{paciente.ultimaVisita}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Próxima Cita</div>
                      <div style={{ color: '#3498db', fontWeight: '500' }}>{paciente.proximaCita}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button 
                      onClick={() => handleVerHistoria(paciente.id)}
                      style={{
                        flex: 1,
                        padding: '0.6rem',
                        backgroundColor: 'white',
                        color: '#475569',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Ver Historia
                    </button>
                    <button 
                      onClick={() => navigate('/pacientes-medico')}
                      style={{
                        flex: 1,
                        padding: '0.6rem',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'citas' && (
          <div>
            <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Todas las Citas</h2>
            {citas.length === 0 ? (
              <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>
                No hay citas registradas
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Paciente</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Fecha</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Hora</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Tipo</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Doctor</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.map((cita) => (
                      <tr key={cita.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem', color: '#1e293b', fontWeight: '500' }}>{cita.paciente}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{cita.fecha}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{cita.hora}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{cita.tipo}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{cita.doctor}</td>
                        <td style={{ padding: '1rem' }}>
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
        )}
      </div>

      {/* Acciones Rápidas - ACTUALIZADAS CON NAVEGACIÓN */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <button 
          onClick={() => navigate('/nota-medica')}
          style={{
            padding: '1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          📝 Nueva Nota Médica
        </button>
        <button 
          onClick={() => navigate('/agendar-cita')}
          style={{
            padding: '1rem',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          📅 Agendar Cita
        </button>
        <button 
          onClick={() => navigate('/reportes-medico')}
          style={{
            padding: '1rem',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          📊 Reportes
        </button>
        <button 
          onClick={() => navigate('/config-medico')}
          style={{
            padding: '1rem',
            backgroundColor: '#9b59b6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          ⚙️ Configuración
        </button>
      </div>
    </main>
  );
}

export default Medico;