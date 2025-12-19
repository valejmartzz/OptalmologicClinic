import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PacientesMedico() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  // Datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    email: '',
    telefono: '',
    direccion: '',
    alergias: '',
    enfermedadesCronicas: '',
    tipoSangre: ''
  });

  useEffect(() => {
    const medicoLogeado = JSON.parse(localStorage.getItem('medicoLogeado'));
    if (!medicoLogeado) {
      navigate('/login-medico');
      return;
    }

    // Simular carga de datos
    setTimeout(() => {
      setPacientes([
        {
          id: 1, nombre: "Ana García", edad: 34, email: "ana@email.com", telefono: "555-0101",
          direccion: "Calle Principal 123", alergias: "Penicilina", enfermedadesCronicas: "Hipertensión",
          tipoSangre: "O+", fechaRegistro: "2023-01-15", ultimaVisita: "2024-03-10"
        },
        {
          id: 2, nombre: "Carlos Rodríguez", edad: 45, email: "carlos@email.com", telefono: "555-0102",
          direccion: "Avenida Central 456", alergias: "Ninguna", enfermedadesCronicas: "Diabetes",
          tipoSangre: "A+", fechaRegistro: "2023-02-20", ultimaVisita: "2024-03-12"
        },
        {
          id: 3, nombre: "María López", edad: 28, email: "maria@email.com", telefono: "555-0103",
          direccion: "Calle Secundaria 789", alergias: "Aspirina", enfermedadesCronicas: "Asma",
          tipoSangre: "B-", fechaRegistro: "2023-03-10", ultimaVisita: "2024-03-15"
        }
      ]);
      setLoading(false);
    }, 800);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (pacienteEditando) {
      // Actualizar paciente
      setPacientes(pacientes.map(p => 
        p.id === pacienteEditando.id ? { ...p, ...formData } : p
      ));
    } else {
      // Crear nuevo paciente
      const nuevoPaciente = {
        id: pacientes.length + 1,
        ...formData,
        fechaRegistro: new Date().toISOString().split('T')[0],
        ultimaVisita: new Date().toISOString().split('T')[0]
      };
      setPacientes([...pacientes, nuevoPaciente]);
    }
    
    setModalAbierto(false);
    setFormData({
      nombre: '', edad: '', email: '', telefono: '', direccion: '',
      alergias: '', enfermedadesCronicas: '', tipoSangre: ''
    });
    setPacienteEditando(null);
  };

  const handleEditar = (paciente) => {
    setPacienteEditando(paciente);
    setFormData({
      nombre: paciente.nombre,
      edad: paciente.edad,
      email: paciente.email,
      telefono: paciente.telefono,
      direccion: paciente.direccion,
      alergias: paciente.alergias,
      enfermedadesCronicas: paciente.enfermedadesCronicas,
      tipoSangre: paciente.tipoSangre
    });
    setModalAbierto(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      setPacientes(pacientes.filter(p => p.id !== id));
    }
  };

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.telefono.includes(searchTerm)
  );

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando pacientes...</div>;
  }

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#1e293b', margin: 0 }}>👥 Gestión de Pacientes</h1>
          <p style={{ color: '#64748b' }}>Administra la información de tus pacientes</p>
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
            onClick={() => setModalAbierto(true)}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            + Nuevo Paciente
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="🔍 Buscar paciente por nombre, email o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '1rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}
        />
      </div>

      {/* Tabla de pacientes */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Paciente</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Contacto</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Información Médica</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Última Visita</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPacientes.map((paciente) => (
                <tr key={paciente.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{paciente.nombre}</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Edad: {paciente.edad} años</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Tipo Sangre: {paciente.tipoSangre}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div>📧 {paciente.email}</div>
                    <div>📱 {paciente.telefono}</div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{paciente.direccion}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div><strong>Alergias:</strong> {paciente.alergias}</div>
                    <div><strong>Enfermedades:</strong> {paciente.enfermedadesCronicas}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: '#3498db', fontWeight: '500' }}>{paciente.ultimaVisita}</div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      Registro: {paciente.fechaRegistro}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => navigate(`/historia-clinica/${paciente.id}`)}
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
                        Historia
                      </button>
                      <button 
                        onClick={() => handleEditar(paciente)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          backgroundColor: '#2ecc71',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleEliminar(paciente.id)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para agregar/editar paciente */}
      {modalAbierto && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#1e293b' }}>
                {pacienteEditando ? 'Editar Paciente' : 'Nuevo Paciente'}
              </h2>
              <button 
                onClick={() => {
                  setModalAbierto(false);
                  setPacienteEditando(null);
                  setFormData({
                    nombre: '', edad: '', email: '', telefono: '', direccion: '',
                    alergias: '', enfermedadesCronicas: '', tipoSangre: ''
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Edad *</label>
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Alergias</label>
                  <input
                    type="text"
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Enfermedades Crónicas</label>
                  <input
                    type="text"
                    name="enfermedadesCronicas"
                    value={formData.enfermedadesCronicas}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Tipo de Sangre</label>
                <select
                  name="tipoSangre"
                  value={formData.tipoSangre}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                >
                  <option value="">Seleccionar...</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setModalAbierto(false);
                    setPacienteEditando(null);
                    setFormData({
                      nombre: '', edad: '', email: '', telefono: '', direccion: '',
                      alergias: '', enfermedadesCronicas: '', tipoSangre: ''
                    });
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#e2e8f0',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {pacienteEditando ? 'Actualizar' : 'Crear Paciente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default PacientesMedico;