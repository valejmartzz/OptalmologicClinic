import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function HistoriaClinica() {
  const navigate = useNavigate();
  const { pacienteId } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('consultas');

  useEffect(() => {
    const medicoLogeado = JSON.parse(localStorage.getItem('medicoLogeado'));
    if (!medicoLogeado) {
      navigate('/login-medico');
      return;
    }

    // Simular carga de datos
    setTimeout(() => {
      // Datos del paciente
      const pacienteDatos = {
        id: parseInt(pacienteId),
        nombre: "Ana García",
        edad: 34,
        genero: "Femenino",
        tipoSangre: "O+",
        alergias: "Penicilina, Mariscos",
        enfermedadesCronicas: "Hipertensión",
        medicamentosActuales: "Losartan 50mg/día",
        contactoEmergencia: "Carlos García (Esposo) - 555-1234",
        fechaRegistro: "2023-01-15"
      };

      // Historial médico
      const historialDatos = [
        {
          id: 1,
          fecha: "2024-03-10",
          tipo: "Consulta",
          doctor: "Dr. Carlos Méndez",
          diagnostico: "Hipertensión controlada",
          tratamiento: "Ajuste dosis Losartan, dieta baja en sal",
          medicamentos: ["Losartan 50mg", "Hidroclorotiazida 12.5mg"],
          notas: "Paciente estable, presión arterial 120/80"
        },
        {
          id: 2,
          fecha: "2024-02-15",
          tipo: "Control",
          doctor: "Dra. María López",
          diagnostico: "Resfriado común",
          tratamiento: "Reposo, hidratación, antigripales",
          medicamentos: ["Paracetamol 500mg cada 8h"],
          notas: "Sin complicaciones, recuperación en 5 días"
        },
        {
          id: 3,
          fecha: "2024-01-20",
          tipo: "Examen",
          doctor: "Dr. Roberto Sánchez",
          diagnostico: "Análisis de sangre rutinario",
          tratamiento: "Seguimiento",
          medicamentos: [],
          notas: "Resultados dentro de rangos normales"
        },
        {
          id: 4,
          fecha: "2023-12-05",
          tipo: "Consulta",
          doctor: "Dr. Carlos Méndez",
          diagnostico: "Control hipertensión",
          tratamiento: "Continuar medicación actual",
          medicamentos: ["Losartan 50mg"],
          notas: "Presión arterial 125/85, buen control"
        }
      ];

      setPaciente(pacienteDatos);
      setHistorial(historialDatos);
      setLoading(false);
    }, 1000);
  }, [navigate, pacienteId]);

  const agregarNota = () => {
    navigate('/nota-medica');
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Cargando historia clínica...
      </div>
    );
  }

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <button 
              onClick={() => navigate('/medico')}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: 'white',
                color: '#475569',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              ← Volver al Panel
            </button>
            
            <h1 style={{ color: '#1e293b', margin: 0 }}>📋 Historia Clínica</h1>
            <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>
              {paciente.nombre} • {paciente.edad} años • {paciente.genero}
            </p>
          </div>
          
          <button 
            onClick={agregarNota}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            📝 Agregar Nota Médica
          </button>
        </div>

        {/* Información del paciente */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem' }}>Información del Paciente</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Tipo de Sangre</div>
              <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.tipoSangre}</div>
            </div>
            
            <div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Alergias</div>
              <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.alergias}</div>
            </div>
            
            <div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Enfermedades Crónicas</div>
              <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.enfermedadesCronicas}</div>
            </div>
            
            <div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Medicamentos Actuales</div>
              <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.medicamentosActuales}</div>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Contacto de Emergencia</div>
            <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.contactoEmergencia}</div>
          </div>
        </div>

        {/* Tabs de secciones */}
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
            onClick={() => setActiveSection('consultas')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeSection === 'consultas' ? '#3498db' : 'transparent',
              color: activeSection === 'consultas' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🏥 Consultas
          </button>
          <button
            onClick={() => setActiveSection('examenes')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeSection === 'examenes' ? '#3498db' : 'transparent',
              color: activeSection === 'examenes' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔬 Exámenes
          </button>
          <button
            onClick={() => setActiveSection('recetas')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeSection === 'recetas' ? '#3498db' : 'transparent',
              color: activeSection === 'recetas' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            💊 Recetas
          </button>
          <button
            onClick={() => setActiveSection('archivos')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeSection === 'archivos' ? '#3498db' : 'transparent',
              color: activeSection === 'archivos' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📎 Archivos
          </button>
        </div>

        {/* Contenido de la sección activa */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          {activeSection === 'consultas' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#1e293b', margin: 0 }}>Historial de Consultas</h2>
                <div style={{ color: '#64748b' }}>
                  {historial.length} registros encontrados
                </div>
              </div>

              {historial.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  No hay consultas registradas para este paciente
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Fecha</th>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Tipo</th>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Médico</th>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Diagnóstico</th>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historial.map((registro) => (
                        <tr key={registro.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '1rem', color: '#1e293b', fontWeight: '500' }}>{registro.fecha}</td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{
                              padding: '0.3rem 0.8rem',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              fontWeight: 'bold',
                              backgroundColor: '#ebf5ff',
                              color: '#0369a1'
                            }}>
                              {registro.tipo}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: '#475569' }}>{registro.doctor}</td>
                          <td style={{ padding: '1rem', color: '#475569' }}>{registro.diagnostico}</td>
                          <td style={{ padding: '1rem' }}>
                            <button 
                              onClick={() => alert(`Ver detalles de consulta ${registro.id}`)}
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
                              Ver Detalles
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

          {activeSection === 'examenes' && (
            <div>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Exámenes y Resultados</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {[
                  { tipo: 'Análisis de Sangre', fecha: '2024-03-10', resultado: 'Normal', archivo: 'sangre_20240310.pdf' },
                  { tipo: 'Radiografía de Tórax', fecha: '2024-02-15', resultado: 'Normal', archivo: 'torax_20240215.pdf' },
                  { tipo: 'Electrocardiograma', fecha: '2024-01-20', resultado: 'Normal', archivo: 'ecg_20240120.pdf' },
                  { tipo: 'Ecografía Abdominal', fecha: '2023-12-05', resultado: 'Normal', archivo: 'eco_20231205.pdf' }
                ].map((examen, index) => (
                  <div key={index} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    backgroundColor: '#f8fafc'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <h3 style={{ margin: 0, color: '#1e293b' }}>{examen.tipo}</h3>
                      <span style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        backgroundColor: examen.resultado === 'Normal' ? '#d4edda' : '#fff3cd',
                        color: examen.resultado === 'Normal' ? '#155724' : '#856404'
                      }}>
                        {examen.resultado}
                      </span>
                    </div>
                    
                    <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      📅 {examen.fecha}
                    </div>
                    
                    <div style={{ color: '#475569', marginBottom: '1rem' }}>
                      Archivo: {examen.archivo}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}>
                        📄 Ver PDF
                      </button>
                      <button style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}>
                        📥 Descargar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'recetas' && (
            <div>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Recetas Médicas</h2>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Fecha</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Medicamento</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Dosis</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Frecuencia</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Duración</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Médico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { fecha: '2024-03-10', medicamento: 'Losartan', dosis: '50mg', frecuencia: '1 vez al día', duracion: 'Permanente', medico: 'Dr. Carlos Méndez' },
                      { fecha: '2024-03-10', medicamento: 'Hidroclorotiazida', dosis: '12.5mg', frecuencia: '1 vez al día', duracion: 'Permanente', medico: 'Dr. Carlos Méndez' },
                      { fecha: '2024-02-15', medicamento: 'Paracetamol', dosis: '500mg', frecuencia: 'Cada 8 horas', duracion: '5 días', medico: 'Dra. María López' },
                      { fecha: '2023-12-05', medicamento: 'Ibuprofeno', dosis: '400mg', frecuencia: 'Cada 12 horas', duracion: '3 días', medico: 'Dr. Carlos Méndez' }
                    ].map((receta, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem', color: '#1e293b' }}>{receta.fecha}</td>
                        <td style={{ padding: '1rem', color: '#475569', fontWeight: '500' }}>{receta.medicamento}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{receta.dosis}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{receta.frecuencia}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{receta.duracion}</td>
                        <td style={{ padding: '1rem', color: '#475569' }}>{receta.medico}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'archivos' && (
            <div>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Archivos Adjuntos</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  { nombre: 'Consentimiento Informado.pdf', tipo: 'PDF', tamaño: '1.2 MB', fecha: '2024-03-10' },
                  { nombre: 'Fotografía Lesión.jpg', tipo: 'Imagen', tamaño: '3.5 MB', fecha: '2024-02-15' },
                  { nombre: 'Autorización Cirugía.pdf', tipo: 'PDF', tamaño: '0.8 MB', fecha: '2024-01-20' },
                  { nombre: 'Historial Vacunación.xlsx', tipo: 'Excel', tamaño: '0.5 MB', fecha: '2023-12-05' },
                  { nombre: 'Resultados Laboratorio.pdf', tipo: 'PDF', tamaño: '2.1 MB', fecha: '2023-11-10' }
                ].map((archivo, index) => (
                  <div key={index} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: archivo.tipo === 'PDF' ? '#fee2e2' : '#dbeafe',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                      color: archivo.tipo === 'PDF' ? '#dc2626' : '#2563eb'
                    }}>
                      {archivo.tipo === 'PDF' ? '📄' : archivo.tipo === 'Imagen' ? '🖼️' : '📊'}
                    </div>
                    
                    <div style={{ fontWeight: '500', color: '#1e293b', marginBottom: '0.25rem' }}>
                      {archivo.nombre}
                    </div>
                    
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {archivo.tamaño} • {archivo.fecha}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'white',
                  color: '#475569',
                  border: '2px dashed #cbd5e1',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📁 Subir Nuevo Archivo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default HistoriaClinica;