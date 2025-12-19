import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfigMedico() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [configData, setConfigData] = useState({
    nombre: '',
    email: '',
    especialidad: '',
    telefono: '',
    direccionConsultorio: '',
    horarioInicio: '08:00',
    horarioFin: '17:00',
    duracionCita: '30',
    notificacionesEmail: true,
    notificacionesSMS: false
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('perfil');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const medicoLogeado = JSON.parse(localStorage.getItem('medicoLogeado'));
    if (!medicoLogeado) {
      navigate('/login-medico');
      return;
    }

    setUsuario(medicoLogeado);
    
    // Cargar datos de configuración (en un caso real, vendrían de una API)
    setConfigData({
      nombre: medicoLogeado.nombre || 'Dr. Juan Pérez',
      email: medicoLogeado.email || 'dr.juan@hospital.com',
      especialidad: medicoLogeado.especialidad || 'Medicina General',
      telefono: '+1 234 567 8900',
      direccionConsultorio: 'Calle Principal 123, Ciudad',
      horarioInicio: '08:00',
      horarioFin: '17:00',
      duracionCita: '30',
      notificacionesEmail: true,
      notificacionesSMS: false
    });
  }, [navigate]);

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfigData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarConfiguracion = () => {
    // Aquí iría la lógica para guardar en el backend
    const usuarioActualizado = {
      ...usuario,
      nombre: configData.nombre,
      email: configData.email,
      especialidad: configData.especialidad
    };
    
    localStorage.setItem('medicoLogeado', JSON.stringify(usuarioActualizado));
    setMensaje('✅ Configuración guardada exitosamente');
    setTimeout(() => setMensaje(''), 3000);
  };

  const cambiarPassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMensaje('❌ Las contraseñas no coinciden');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMensaje('❌ La contraseña debe tener al menos 6 caracteres');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }
    
    // Aquí iría la lógica para cambiar la contraseña en el backend
    setMensaje('✅ Contraseña cambiada exitosamente');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
          
          <h1 style={{ color: '#1e293b', margin: 0 }}>⚙️ Configuración</h1>
          <p style={{ color: '#64748b' }}>Personaliza tu cuenta y preferencias</p>
        </div>

        {mensaje && (
          <div style={{
            padding: '1rem',
            backgroundColor: mensaje.includes('✅') ? '#d4edda' : '#f8d7da',
            color: mensaje.includes('✅') ? '#155724' : '#721c24',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: `1px solid ${mensaje.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {mensaje}
          </div>
        )}

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
            onClick={() => setActiveTab('perfil')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeTab === 'perfil' ? '#3498db' : 'transparent',
              color: activeTab === 'perfil' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            👤 Perfil
          </button>
          <button
            onClick={() => setActiveTab('horario')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeTab === 'horario' ? '#3498db' : 'transparent',
              color: activeTab === 'horario' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🕐 Horario
          </button>
          <button
            onClick={() => setActiveTab('seguridad')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeTab === 'seguridad' ? '#3498db' : 'transparent',
              color: activeTab === 'seguridad' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔒 Seguridad
          </button>
          <button
            onClick={() => setActiveTab('notificaciones')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeTab === 'notificaciones' ? '#3498db' : 'transparent',
              color: activeTab === 'notificaciones' ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔔 Notificaciones
          </button>
        </div>

        {/* Contenido según tab */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          {activeTab === 'perfil' && (
            <div>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Información Personal</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={configData.nombre}
                    onChange={handleConfigChange}
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
                    Especialidad *
                  </label>
                  <select
                    name="especialidad"
                    value={configData.especialidad}
                    onChange={handleConfigChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc'
                    }}
                  >
                    <option value="Medicina General">Medicina General</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Pediatría">Pediatría</option>
                    <option value="Dermatología">Dermatología</option>
                    <option value="Ginecología">Ginecología</option>
                    <option value="Ortopedia">Ortopedia</option>
                    <option value="Neurología">Neurología</option>
                    <option value="Oftalmología">Oftalmología</option>
                    <option value="Psiquiatría">Psiquiatría</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={configData.email}
                  onChange={handleConfigChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={configData.telefono}
                  onChange={handleConfigChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Dirección del Consultorio
                </label>
                <textarea
                  name="direccionConsultorio"
                  value={configData.direccionConsultorio}
                  onChange={handleConfigChange}
                  rows="3"
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

              <button
                onClick={guardarConfiguracion}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                💾 Guardar Cambios
              </button>
            </div>
          )}

          {activeTab === 'horario' && (
            <div>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Configuración de Horario</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                    Hora de Inicio
                  </label>
                  <select
                    name="horarioInicio"
                    value={configData.horarioInicio}
                    onChange={handleConfigChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc'
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const hora = i + 6; // De 6:00 a 17:00
                      return [`${hora.toString().padStart(2, '0')}:00`, `${hora.toString().padStart(2, '0')}:30`];
                    }).flat().map(hora => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                    Hora de Fin
                  </label>
                  <select
                    name="horarioFin"
                    value={configData.horarioFin}
                    onChange={handleConfigChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc'
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const hora = i + 6; // De 6:00 a 17:00
                      return [`${hora.toString().padStart(2, '0')}:00`, `${hora.toString().padStart(2, '0')}:30`];
                    }).flat().map(hora => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Duración de Citas (minutos)
                </label>
                <select
                  name="duracionCita"
                  value={configData.duracionCita}
                  onChange={handleConfigChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <option value="15">15 minutos</option>
                  <option value="20">20 minutos</option>
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60">60 minutos</option>
                </select>
              </div>

              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #bae6fd',
                marginBottom: '2rem'
              }}>
                <h3 style={{ color: '#0369a1', marginTop: 0, marginBottom: '1rem' }}>📅 Horario Configurado</h3>
                <div style={{ color: '#475569' }}>
                  <p><strong>Horario de atención:</strong> {configData.horarioInicio} - {configData.horarioFin}</p>
                  <p><strong>Duración por cita:</strong> {configData.duracionCita} minutos</p>
                  <p><strong>Citas por día:</strong> {Math.floor((parseInt(configData.horarioFin.split(':')[0]) * 60 + parseInt(configData.horarioFin.split(':')[1]) - 
                    (parseInt(configData.horarioInicio.split(':')[0]) * 60 + parseInt(configData.horarioInicio.split(':')[1]))) / parseInt(configData.duracionCita))}</p>
                </div>
              </div>

              <button
                onClick={guardarConfiguracion}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                💾 Guardar Horario
              </button>
            </div>
          )}

          {activeTab === 'seguridad' && (
            <div>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Seguridad y Contraseña</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Contraseña Actual *
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Nueva Contraseña *
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                />
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Mínimo 6 caracteres
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Confirmar Nueva Contraseña *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <button
                onClick={cambiarPassword}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                🔒 Cambiar Contraseña
              </button>

              <div style={{
                backgroundColor: '#fef3c7',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #fde68a',
                marginTop: '2rem'
              }}>
                <h3 style={{ color: '#92400e', marginTop: 0, marginBottom: '1rem' }}>🔐 Recomendaciones de Seguridad</h3>
                <ul style={{ color: '#92400e', paddingLeft: '1.5rem', margin: 0 }}>
                  <li>Usa una contraseña única y compleja</li>
                  <li>No compartas tu contraseña con nadie</li>
                  <li>Cambia tu contraseña periódicamente</li>
                  <li>Cierra sesión cuando uses equipos compartidos</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'notificaciones' && (
            <div>
              <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>Preferencias de Notificaciones</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#475569', marginBottom: '1rem' }}>Tipos de Notificaciones</h3>
                
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="notificacionesEmail"
                      checked={configData.notificacionesEmail}
                      onChange={handleConfigChange}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ fontWeight: '500', color: '#1e293b' }}>Notificaciones por Email</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        Recibir recordatorios de citas, resultados y actualizaciones por email
                      </div>
                    </div>
                  </label>
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="notificacionesSMS"
                      checked={configData.notificacionesSMS}
                      onChange={handleConfigChange}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ fontWeight: '500', color: '#1e293b' }}>Notificaciones por SMS</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        Recibir recordatorios urgentes por mensaje de texto
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#475569', marginBottom: '1rem' }}>Frecuencia de Recordatorios</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  {['24 horas antes', '12 horas antes', '6 horas antes', '1 hora antes'].map((frecuencia) => (
                    <label key={frecuencia} style={{
                      padding: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}>
                      <input
                        type="radio"
                        name="frecuencia"
                        value={frecuencia}
                        defaultChecked={frecuencia === '24 horas antes'}
                        style={{ display: 'none' }}
                      />
                      {frecuencia}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={guardarConfiguracion}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                💾 Guardar Preferencias
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ConfigMedico;