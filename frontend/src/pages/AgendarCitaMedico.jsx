import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Database from '../data/database';

function AgendarCitaMedico() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [medicoActual, setMedicoActual] = useState(null);
  const [citaData, setCitaData] = useState({
    pacienteId: '',
    medicoId: '',
    fecha: '',
    hora: '09:00',
    tipo: 'Consulta',
    motivo: '',
    duracion: '30',
    estado: 'Confirmada'
  });

  useEffect(() => {
    const medicoLogeado = JSON.parse(localStorage.getItem('medicoLogeado'));
    if (!medicoLogeado) {
      navigate('/login-medico');
      return;
    }

    // Establecer médico actual
    setMedicoActual(medicoLogeado);
    
    // Obtener pacientes de la base de datos
    const pacientesDB = Database.getPacientes();
    setPacientes(pacientesDB);

    // Obtener médicos de la base de datos
    const medicosDB = Database.getMedicos();
    setMedicos(medicosDB);

    // Establecer médico actual como seleccionado por defecto
    const medicoEncontrado = medicosDB.find(m => 
      m.nombre === medicoLogeado.nombre || 
      m.email === medicoLogeado.email
    );
    
    if (medicoEncontrado) {
      setCitaData(prev => ({
        ...prev,
        medicoId: medicoEncontrado.id,
        medicoNombre: medicoEncontrado.nombre
      }));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCitaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que se haya seleccionado un paciente
    if (!citaData.pacienteId) {
      alert('Por favor seleccione un paciente');
      return;
    }

    // Obtener datos del paciente seleccionado
    const pacienteSeleccionado = pacientes.find(p => p.id === parseInt(citaData.pacienteId));
    
    // Obtener datos del médico seleccionado
    let medicoSeleccionado;
    if (citaData.medicoId) {
      medicoSeleccionado = medicos.find(m => m.id === parseInt(citaData.medicoId));
    } else if (medicoActual) {
      // Si no se seleccionó médico, usar el médico logueado
      medicoSeleccionado = {
        id: medicoActual.id || 1,
        nombre: medicoActual.nombre || 'Médico Actual'
      };
    }

    // Crear objeto de cita para la base de datos
    const nuevaCita = {
      pacienteId: parseInt(citaData.pacienteId),
      pacienteNombre: pacienteSeleccionado.nombre,
      medicoId: medicoSeleccionado.id,
      medicoNombre: medicoSeleccionado.nombre,
      fecha: citaData.fecha,
      hora: citaData.hora,
      tipo: citaData.tipo,
      motivo: citaData.motivo,
      duracion: citaData.duracion,
      estado: citaData.estado
    };

    // Guardar en la base de datos
    Database.addCita(nuevaCita);

    // Actualizar la última visita del paciente
    Database.updatePaciente(pacienteSeleccionado.id, {
      ultimaVisita: new Date().toISOString().split('T')[0],
      proximaCita: citaData.fecha
    });

    alert(`✅ Cita agendada exitosamente para:\n\n📋 Paciente: ${pacienteSeleccionado.nombre}\n👨‍⚕️ Médico: ${medicoSeleccionado.nombre}\n📅 Fecha: ${citaData.fecha}\n🕐 Hora: ${citaData.hora}\n\nLa cita ahora aparecerá en el panel del paciente.`);
    
    // Limpiar formulario
    setCitaData({
      pacienteId: '',
      medicoId: medicoActual ? (medicos.find(m => m.nombre === medicoActual.nombre)?.id || '') : '',
      fecha: '',
      hora: '09:00',
      tipo: 'Consulta',
      motivo: '',
      duracion: '30',
      estado: 'Confirmada'
    });
  };

  // Generar horas disponibles (de 8:00 a 18:00)
  const horasDisponibles = [];
  for (let i = 8; i <= 18; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hora = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
      horasDisponibles.push(hora);
    }
  }

  // Obtener fecha mínima (hoy) y máxima (un año desde hoy)
  const hoy = new Date();
  const hoyStr = hoy.toISOString().split('T')[0];
  const maxFecha = new Date(hoy);
  maxFecha.setFullYear(hoy.getFullYear() + 1);
  const maxFechaStr = maxFecha.toISOString().split('T')[0];

  // Calcular citas existentes para el día seleccionado
  const citasDelDia = citaData.fecha 
    ? Database.getCitas().filter(cita => cita.fecha === citaData.fecha)
    : [];
  
  const horasOcupadas = citasDelDia.map(cita => cita.hora);

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button 
            onClick={() => navigate('/medico')}
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
            ← Volver al Panel
          </button>
          
          <h1 style={{ color: '#1e293b', margin: 0 }}>📅 Agendar Nueva Cita</h1>
          <p style={{ color: '#64748b' }}>Programa citas médicas para tus pacientes</p>
        </div>

        {/* Formulario */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Selección de paciente */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Seleccionar Paciente *
              </label>
              <select
                name="pacienteId"
                value={citaData.pacienteId}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc'
                }}
              >
                <option value="">-- Seleccionar paciente --</option>
                {pacientes.map(paciente => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nombre} - {paciente.edad} años - 📞 {paciente.telefono}
                  </option>
                ))}
              </select>
              
              {citaData.pacienteId && (
                <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>👤</span>
                    <div>
                      <strong style={{ color: '#1e293b' }}>
                        {pacientes.find(p => p.id === parseInt(citaData.pacienteId))?.nombre}
                      </strong>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        📧 {pacientes.find(p => p.id === parseInt(citaData.pacienteId))?.email} | 
                        📱 {pacientes.find(p => p.id === parseInt(citaData.pacienteId))?.telefono}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Información del médico */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Médico Asignado
              </label>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #bae6fd'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>👨‍⚕️</span>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#0369a1' }}>
                      {medicoActual?.nombre || 'Médico Actual'}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      {medicoActual?.especialidad || 'Especialidad'} • Cita será asignada a usted
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Fecha de la Cita *
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={citaData.fecha}
                  onChange={handleInputChange}
                  required
                  min={hoyStr}
                  max={maxFechaStr}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Hora *
                </label>
                <select
                  name="hora"
                  value={citaData.hora}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <option value="">-- Seleccionar hora --</option>
                  {horasDisponibles.map(hora => (
                    <option 
                      key={hora} 
                      value={hora}
                      disabled={horasOcupadas.includes(hora)}
                      style={{
                        color: horasOcupadas.includes(hora) ? '#94a3b8' : 'inherit',
                        backgroundColor: horasOcupadas.includes(hora) ? '#f1f5f9' : 'inherit'
                      }}
                    >
                      {hora} {horasOcupadas.includes(hora) ? '(Ocupada)' : ''}
                    </option>
                  ))}
                </select>
                {horasOcupadas.length > 0 && (
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                    {horasOcupadas.length} horas ocupadas este día
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Duración (minutos)
                </label>
                <select
                  name="duracion"
                  value={citaData.duracion}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60">60 minutos</option>
                  <option value="90">90 minutos</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Estado
                </label>
                <select
                  name="estado"
                  value={citaData.estado}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <option value="Confirmada">✅ Confirmada</option>
                  <option value="Pendiente">⏳ Pendiente</option>
                  <option value="Urgente">🚨 Urgente</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Tipo de Consulta *
              </label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['Consulta', 'Control', 'Examen', 'Revisión', 'Urgencia', 'Cirugía', 'Seguimiento'].map(tipo => (
                  <label key={tipo} style={{
                    flex: '1',
                    minWidth: '120px',
                    padding: '0.75rem',
                    border: `2px solid ${citaData.tipo === tipo ? '#3498db' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: citaData.tipo === tipo ? '#ebf5ff' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}>
                    <input
                      type="radio"
                      name="tipo"
                      value={tipo}
                      checked={citaData.tipo === tipo}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                    {tipo}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Motivo de la Consulta *
              </label>
              <textarea
                name="motivo"
                value={citaData.motivo}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describa el motivo de la consulta..."
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Resumen de la cita */}
            {citaData.pacienteId && citaData.fecha && citaData.hora && (
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #bae6fd',
                marginBottom: '2rem'
              }}>
                <h3 style={{ color: '#0369a1', marginTop: 0, marginBottom: '1rem' }}>📋 Resumen de la Cita</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Paciente</div>
                    <div style={{ color: '#1e293b', fontWeight: '500' }}>
                      {pacientes.find(p => p.id === parseInt(citaData.pacienteId))?.nombre}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Médico</div>
                    <div style={{ color: '#1e293b', fontWeight: '500' }}>
                      {medicoActual?.nombre || 'Médico Actual'}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Fecha y Hora</div>
                    <div style={{ color: '#1e293b', fontWeight: '500' }}>
                      {citaData.fecha} a las {citaData.hora}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Tipo</div>
                    <div style={{ color: '#1e293b', fontWeight: '500' }}>
                      {citaData.tipo} ({citaData.duracion} min)
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate('/medico')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#e2e8f0',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2ecc71',
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
                📅 Agendar Cita
              </button>
            </div>
          </form>
        </div>

        {/* Citas recientes del paciente seleccionado */}
        {citaData.pacienteId && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>📋 Citas Anteriores del Paciente</h3>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              {(() => {
                const citasPaciente = Database.getCitasPorPaciente(parseInt(citaData.pacienteId));
                return citasPaciente.length > 0 ? (
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
                        {citasPaciente.map((cita, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.75rem', color: '#1e293b' }}>{cita.fecha}</td>
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
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No hay citas anteriores registradas para este paciente
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AgendarCitaMedico;