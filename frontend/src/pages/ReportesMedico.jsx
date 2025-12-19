import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportesMedico() {
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState('mes');
  const [datosReporte, setDatosReporte] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const medicoLogeado = JSON.parse(localStorage.getItem('medicoLogeado'));
    if (!medicoLogeado) {
      navigate('/login-medico');
      return;
    }

    // Simular carga de datos
    setTimeout(() => {
      setDatosReporte({
        totalPacientes: 156,
        totalCitas: 324,
        ingresos: 45600,
        citasCanceladas: 12,
        citasCompletadas: 298,
        citasPendientes: 14,
        pacientesNuevos: 23,
        enfermedadesComunes: [
          { nombre: 'Hipertensión', casos: 45 },
          { nombre: 'Diabetes', casos: 32 },
          { nombre: 'Gripe', casos: 28 },
          { nombre: 'Dolor lumbar', casos: 22 },
          { nombre: 'Ansiedad', casos: 18 }
        ],
        citasPorDia: [
          { dia: 'Lun', citas: 15 },
          { dia: 'Mar', citas: 18 },
          { dia: 'Mié', citas: 12 },
          { dia: 'Jue', citas: 20 },
          { dia: 'Vie', citas: 16 },
          { dia: 'Sáb', citas: 8 },
          { dia: 'Dom', citas: 2 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [navigate, periodo]);

  const exportarReporte = () => {
    alert('Reporte exportado exitosamente');
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Cargando reportes...
      </div>
    );
  }

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#1e293b', margin: 0 }}>📊 Reportes y Estadísticas</h1>
          <p style={{ color: '#64748b' }}>Análisis de actividad y desempeño médico</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/medico')}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: 'white',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ← Volver al Panel
          </button>
          <button 
            onClick={exportarReporte}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            📥 Exportar Reporte
          </button>
        </div>
      </div>

      {/* Filtros de periodo */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'dia', label: 'Hoy' },
            { id: 'semana', label: 'Esta Semana' },
            { id: 'mes', label: 'Este Mes' },
            { id: 'trimestre', label: 'Este Trimestre' },
            { id: 'anio', label: 'Este Año' }
          ].map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => setPeriodo(opcion.id)}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: periodo === opcion.id ? '#3498db' : '#f1f5f9',
                color: periodo === opcion.id ? 'white' : '#475569',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: periodo === opcion.id ? '500' : 'normal'
              }}
            >
              {opcion.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resumen General */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderTop: '4px solid #3498db'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#ebf5ff',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              👥
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
                {datosReporte.totalPacientes}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Pacientes Totales</div>
            </div>
          </div>
          <div style={{ color: '#2ecc71', fontSize: '0.9rem' }}>
            ↑ {datosReporte.pacientesNuevos} nuevos este mes
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderTop: '4px solid #2ecc71'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#f0fdf4',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              📅
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>
                {datosReporte.totalCitas}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Citas Totales</div>
            </div>
          </div>
          <div style={{ color: '#2ecc71', fontSize: '0.9rem' }}>
            {datosReporte.citasCompletadas} completadas ({Math.round(datosReporte.citasCompletadas / datosReporte.totalCitas * 100)}%)
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderTop: '4px solid #f39c12'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#fef3c7',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              💰
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
                ${datosReporte.ingresos.toLocaleString()}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Ingresos Totales</div>
            </div>
          </div>
          <div style={{ color: '#2ecc71', fontSize: '0.9rem' }}>
            Promedio: ${Math.round(datosReporte.ingresos / datosReporte.totalCitas)} por cita
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderTop: '4px solid #e74c3c'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#fee2e2',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              ❌
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                {datosReporte.citasCanceladas}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Citas Canceladas</div>
            </div>
          </div>
          <div style={{ color: '#e74c3c', fontSize: '0.9rem' }}>
            {Math.round(datosReporte.citasCanceladas / datosReporte.totalCitas * 100)}% del total
          </div>
        </div>
      </div>

      {/* Gráficos y tablas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Gráfico de citas por día */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Citas por Día</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '1rem' }}>
            {datosReporte.citasPorDia.map((item, index) => {
              const maxCitas = Math.max(...datosReporte.citasPorDia.map(d => d.citas));
              const altura = (item.citas / maxCitas) * 150;
              
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '30px',
                    height: `${altura}px`,
                    backgroundColor: item.dia === 'Dom' || item.dia === 'Sáb' ? '#93c5fd' : '#3498db',
                    borderRadius: '4px 4px 0 0'
                  }}></div>
                  <div style={{ marginTop: '0.5rem', color: '#64748b', fontWeight: '500' }}>
                    {item.dia}
                  </div>
                  <div style={{ marginTop: '0.25rem', color: '#1e293b', fontWeight: 'bold' }}>
                    {item.citas}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enfermedades más comunes */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Enfermedades más Comunes</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Enfermedad</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Casos</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                {datosReporte.enfermedadesComunes.map((enfermedad, index) => {
                  const porcentaje = Math.round((enfermedad.casos / datosReporte.totalPacientes) * 100);
                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem', color: '#1e293b' }}>{enfermedad.nombre}</td>
                      <td style={{ padding: '0.75rem', color: '#475569' }}>{enfermedad.casos}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            flex: 1,
                            height: '8px',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${porcentaje}%`,
                              height: '100%',
                              backgroundColor: '#3498db',
                              borderRadius: '4px'
                            }}></div>
                          </div>
                          <span style={{ color: '#475569', fontSize: '0.9rem' }}>{porcentaje}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem' }}>📈 Métricas de Desempeño</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2ecc71' }}>92%</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Satisfacción del Paciente</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f39c12' }}>18 min</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Tiempo Promedio de Espera</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#3498db' }}>86%</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Tasa de Asistencia</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#9b59b6' }}>24 hr</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Respuesta Promedio</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ReportesMedico;