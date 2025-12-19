import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Database from '../data/database';

function Consultas() {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [pacienteData, setPacienteData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    genero: ''
  });
  const [citaData, setCitaData] = useState({
    medicoId: '',
    tipoConsulta: '',
    fecha: '',
    hora: '09:00',
    motivo: ''
  });

  // Mapeo entre tipos de consulta y especialidades médicas
  const mapeoConsultasEspecialidades = {
    'Consulta General': ['Oftalmología General', 'Consulta General'],
    'Glaucoma': ['Glaucoma', 'Oftalmología General'],
    'Retina': ['Retina', 'Oftalmología General'],
    'Cataratas': ['Cataratas', 'Cirugía Refractiva'],
    'Pediatría': ['Pediatría Oftalmológica', 'Pediatría'],
    'Córnea': ['Córnea', 'Oftalmología General'],
    'Estrabismo': ['Estrabismo', 'Pediatría Oftalmológica'],
    'Oculoplástica': ['Oculoplástica', 'Cirugía']
  };

  const consultasDisponibles = [
    {
      nombre: "Consulta General Oftalmológica",
      descripcion: "Evaluación completa de la salud visual básica y detección de problemas oculares comunes",
      duracion: "30 min",
      tipo: "Consulta General",
      precio: "$800",
      especialidades: ["Oftalmología General", "Consulta General"]
    },
    {
      nombre: "Consulta de Glaucoma",
      descripcion: "Detección, diagnóstico y seguimiento especializado de glaucoma",
      duracion: "45 min",
      tipo: "Glaucoma",
      precio: "$1,200",
      especialidades: ["Glaucoma"]
    },
    {
      nombre: "Consulta de Retina",
      descripcion: "Diagnóstico y tratamiento de enfermedades retinianas como desprendimiento y degeneración macular",
      duracion: "45 min",
      tipo: "Retina",
      precio: "$1,500",
      especialidades: ["Retina"]
    },
    {
      nombre: "Consulta de Cataratas",
      descripcion: "Evaluación preoperatoria, cirugía y seguimiento postoperatorio de cataratas",
      duracion: "40 min",
      tipo: "Cataratas",
      precio: "$1,000",
      especialidades: ["Cataratas", "Cirugía Refractiva"]
    },
    {
      nombre: "Consulta Pediátrica Oftalmológica",
      descripcion: "Atención especializada para niños con problemas visuales y desarrollo ocular",
      duracion: "40 min",
      tipo: "Pediatría",
      precio: "$900",
      especialidades: ["Pediatría Oftalmológica", "Pediatría"]
    },
    {
      nombre: "Consulta de Córnea",
      descripcion: "Diagnóstico y tratamiento de enfermedades corneales, queratocono y trasplantes",
      duracion: "45 min",
      tipo: "Córnea",
      precio: "$1,300",
      especialidades: ["Córnea"]
    },
    {
      nombre: "Consulta de Estrabismo",
      descripcion: "Evaluación y tratamiento de estrabismo en niños y adultos",
      duracion: "45 min",
      tipo: "Estrabismo",
      precio: "$1,100",
      especialidades: ["Estrabismo", "Pediatría Oftalmológica"]
    },
    {
      nombre: "Consulta de Oculoplástica",
      descripcion: "Cirugía plástica ocular, párpados y vías lagrimales",
      duracion: "50 min",
      tipo: "Oculoplástica",
      precio: "$1,800",
      especialidades: ["Oculoplástica", "Cirugía"]
    }
  ];

  useEffect(() => {
    // Obtener médicos de la base de datos
    const medicosDB = Database.getMedicos();
    console.log('Médicos cargados:', medicosDB);
    setMedicos(medicosDB);
    
    // Establecer fecha mínima (mañana) y máxima (3 meses)
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const fechaMin = manana.toISOString().split('T')[0];
    
    const tresMeses = new Date();
    tresMeses.setMonth(tresMeses.getMonth() + 3);
    const fechaMax = tresMeses.toISOString().split('T')[0];
    
    setCitaData(prev => ({
      ...prev,
      fecha: fechaMin,
      minFecha: fechaMin,
      maxFecha: fechaMax
    }));
  }, []);

  const handlePacienteChange = (e) => {
    const { name, value } = e.target;
    setPacienteData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCitaChange = (e) => {
    const { name, value } = e.target;
    setCitaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const seleccionarConsulta = (consulta) => {
    console.log('Consulta seleccionada:', consulta);
    
    // Obtener médicos que coincidan con las especialidades de la consulta
    const medicosFiltrados = medicos.filter(medico => {
      const especialidadesConsulta = consulta.especialidades || [consulta.tipo];
      return especialidadesConsulta.some(especialidad => 
        medico.especialidad && medico.especialidad.includes(especialidad)
      );
    });
    
    console.log('Médicos filtrados para', consulta.tipo, ':', medicosFiltrados);
    
    setCitaData(prev => ({
      ...prev,
      tipoConsulta: consulta.tipo,
      medicoId: medicosFiltrados.length > 0 ? medicosFiltrados[0].id : ''
    }));
    
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para filtrar médicos según el tipo de consulta
  const filtrarMedicosPorEspecialidad = () => {
    if (!citaData.tipoConsulta) return medicos;
    
    const consultaSeleccionada = consultasDisponibles.find(c => c.tipo === citaData.tipoConsulta);
    if (!consultaSeleccionada) return medicos;
    
    return medicos.filter(medico => {
      const especialidadesConsulta = consultaSeleccionada.especialidades || [consultaSeleccionada.tipo];
      return especialidadesConsulta.some(especialidad => 
        medico.especialidad && medico.especialidad.includes(especialidad)
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar datos del paciente
    if (!pacienteData.nombre || !pacienteData.email || !pacienteData.telefono) {
      alert('Por favor complete todos los campos obligatorios del paciente');
      return;
    }

    if (!citaData.medicoId || !citaData.fecha || !citaData.hora) {
      alert('Por favor complete todos los campos de la cita');
      return;
    }

    // Verificar si el paciente ya existe
    let pacienteExistente = Database.getPacientes().find(p => 
      p.email === pacienteData.email || p.telefono === pacienteData.telefono
    );

    let pacienteId;
    if (pacienteExistente) {
      // Actualizar datos del paciente existente
      pacienteId = pacienteExistente.id;
      Database.updatePaciente(pacienteId, {
        ...pacienteData,
        ultimaActualizacion: new Date().toISOString().split('T')[0]
      });
    } else {
      // Crear nuevo paciente
      const nuevoPaciente = {
        ...pacienteData,
        fechaRegistro: new Date().toISOString().split('T')[0]
      };
      const pacienteGuardado = Database.addPaciente(nuevoPaciente);
      pacienteId = pacienteGuardado.id;
    }

    // Obtener datos del médico
    const medicoSeleccionado = medicos.find(m => m.id === parseInt(citaData.medicoId));
    
    if (!medicoSeleccionado) {
      alert('Error: No se encontró el médico seleccionado');
      return;
    }
    
    // Obtener el nombre de la consulta seleccionada
    const consultaSeleccionada = consultasDisponibles.find(c => c.tipo === citaData.tipoConsulta);

    // Crear la cita en la base de datos
    const nuevaCita = {
      pacienteId: pacienteId,
      pacienteNombre: pacienteData.nombre,
      medicoId: medicoSeleccionado.id,
      medicoNombre: medicoSeleccionado.nombre,
      fecha: citaData.fecha,
      hora: citaData.hora,
      tipo: citaData.tipoConsulta,
      nombreConsulta: consultaSeleccionada?.nombre || citaData.tipoConsulta,
      motivo: citaData.motivo || `Consulta de ${citaData.tipoConsulta}`,
      duracion: consultaSeleccionada?.duracion?.replace(' min', '') || '30',
      estado: 'Pendiente',
      origen: 'Sitio Web'
    };

    // Guardar la cita en la base de datos
    Database.addCita(nuevaCita);

    // Mostrar confirmación
    alert(`✅ ¡Cita solicitada exitosamente!\n\n📋 Paciente: ${pacienteData.nombre}\n📧 Email: ${pacienteData.email}\n📱 Teléfono: ${pacienteData.telefono}\n👨‍⚕️ Médico: ${medicoSeleccionado.nombre}\n🎓 Especialidad: ${medicoSeleccionado.especialidad}\n🏥 Consulta: ${consultaSeleccionada?.nombre}\n📅 Fecha: ${citaData.fecha}\n🕐 Hora: ${citaData.hora}\n\n📞 Nos pondremos en contacto para confirmar la cita.`);

    // Limpiar formulario y redirigir
    setPacienteData({
      nombre: '',
      email: '',
      telefono: '',
      fechaNacimiento: '',
      genero: ''
    });
    
    setCitaData(prev => ({
      medicoId: '',
      tipoConsulta: '',
      fecha: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
      hora: '09:00',
      motivo: ''
    }));
    
    setShowForm(false);
    
    // Redirigir a la página de perfil
    if (pacienteExistente && pacienteExistente.password) {
      // Si ya tiene contraseña, logearlo automáticamente
      localStorage.setItem('pacienteLogeado', JSON.stringify(pacienteExistente));
      navigate('/perfil');
    } else {
      // Si no tiene contraseña, redirigir al login para completar registro
      navigate('/login-paciente');
    }
  };

  // Generar horas disponibles (de 8:00 a 18:00)
  const horasDisponibles = [];
  for (let i = 8; i <= 18; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hora = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
      horasDisponibles.push(hora);
    }
  }

  return (
    <main style={{ padding: "3rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Botón para volver */}
      <button 
        onClick={() => navigate("/")}
        style={{
          marginBottom: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f0f0f0",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}
      >
        ← Volver a Inicio
      </button>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ 
          color: "#2c3e50", 
          marginBottom: "0.5rem",
          fontSize: "2.5rem"
        }}>
          👁️ Consultas Oftalmológicas
        </h1>
        
        <p style={{ 
          fontSize: "1.2rem", 
          color: "#7f8c8d",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.6"
        }}>
          Evaluación completa de la salud visual con especialistas certificados y tecnología de última generación
        </p>
      </div>

      {/* Formulario de Solicitud de Cita */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: '1px solid #3498db'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#1e293b', margin: 0 }}>📋 Solicitar Cita</h2>
            <button 
              onClick={() => setShowForm(false)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#e2e8f0',
                color: '#475569',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={pacienteData.nombre}
                  onChange={handlePacienteChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={pacienteData.email}
                  onChange={handlePacienteChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                  placeholder="ejemplo@email.com"
                />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={pacienteData.telefono}
                  onChange={handlePacienteChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                  placeholder="Ej: 555-123-4567"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={pacienteData.fechaNacimiento}
                  onChange={handlePacienteChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Género
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'].map(genero => (
                  <label key={genero} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="radio"
                      name="genero"
                      value={genero}
                      checked={pacienteData.genero === genero}
                      onChange={handlePacienteChange}
                    />
                    {genero}
                  </label>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Fecha de la Cita *
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={citaData.fecha}
                  onChange={handleCitaChange}
                  required
                  min={citaData.minFecha}
                  max={citaData.maxFecha}
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
                  onChange={handleCitaChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  {horasDisponibles.map(hora => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Médico Especialista *
                </label>
                <select
                  name="medicoId"
                  value={citaData.medicoId}
                  onChange={handleCitaChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <option value="">-- Seleccionar médico especialista --</option>
                  {filtrarMedicosPorEspecialidad().map(medico => (
                    <option key={medico.id} value={medico.id}>
                      {medico.nombre} - {medico.especialidad}
                    </option>
                  ))}
                </select>
                {citaData.tipoConsulta && (
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                    Especialistas en: {citaData.tipoConsulta}
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Motivo de la Consulta (opcional)
              </label>
              <textarea
                name="motivo"
                value={citaData.motivo}
                onChange={handleCitaChange}
                rows="3"
                placeholder="Describa brevemente el motivo de su consulta..."
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
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
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
                  fontWeight: 'bold'
                }}
              >
                📅 Solicitar Cita
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Consultas */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ 
          color: "#34495e", 
          marginBottom: "2rem", 
          borderBottom: "3px solid #3498db", 
          paddingBottom: "0.5rem",
          fontSize: "1.8rem"
        }}>
          Nuestras Consultas Especializadas
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem"
        }}>
          {consultasDisponibles.map((consulta, index) => (
            <div 
              key={index}
              style={{
                padding: "1.8rem",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
            >
              {/* Badge de especialidad */}
              <div style={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "#3498db",
                color: "white",
                padding: "0.3rem 1rem",
                borderBottomLeftRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: "bold"
              }}>
                {consulta.duracion}
              </div>
              
              <h3 style={{ 
                color: "#2980b9", 
                marginBottom: "1rem",
                fontSize: "1.3rem",
                paddingRight: "60px"
              }}>
                {consulta.nombre}
              </h3>
              
              <p style={{ 
                color: "#555", 
                marginBottom: "1.5rem",
                lineHeight: "1.5"
              }}>
                {consulta.descripcion}
              </p>
              
              {/* Información de la consulta */}
              <div style={{
                backgroundColor: "#f8f9fa",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem"
              }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem"
                }}>
                  <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                    🏥 Especialidad:
                  </span>
                  <span style={{ color: "#27ae60", fontWeight: "bold" }}>
                    {consulta.tipo}
                  </span>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem"
                }}>
                  <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                    👨‍⚕️ Médicos Disponibles:
                  </span>
                  <span style={{ color: "#3498db", fontWeight: "bold" }}>
                    {medicos.filter(m => 
                      consulta.especialidades.some(especialidad => 
                        m.especialidad && m.especialidad.includes(especialidad)
                      )
                    ).length}
                  </span>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                    💰 Inversión:
                  </span>
                  <span style={{ 
                    color: "#e74c3c", 
                    fontWeight: "bold",
                    fontSize: "1.1rem"
                  }}>
                    {consulta.precio}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => seleccionarConsulta(consulta)}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  backgroundColor: "#2ecc71",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#27ae60"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2ecc71"}
              >
                Agendar esta consulta
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Información Adicional */}
      <div style={{
        backgroundColor: "#e8f4fc",
        padding: "2.5rem",
        borderRadius: "12px",
        borderLeft: "5px solid #3498db",
        marginBottom: "3rem"
      }}>
        <h3 style={{ 
          color: "#2c3e50", 
          marginBottom: "1.5rem",
          fontSize: "1.5rem"
        }}>
          ℹ️ Proceso de Consulta
        </h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem"
        }}>
          <div>
            <h4 style={{ color: "#2980b9", marginBottom: "0.8rem" }}>
              1. 📅 Agendamiento
            </h4>
            <p style={{ color: "#555" }}>
              Selecciona la consulta especializada y agenda tu cita en línea o por teléfono.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: "#2980b9", marginBottom: "0.8rem" }}>
              2. 🏥 Evaluación
            </h4>
            <p style={{ color: "#555" }}>
              Examen completo con tecnología de punta y evaluación por especialista.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: "#2980b9", marginBottom: "0.8rem" }}>
              3. 📋 Diagnóstico
            </h4>
            <p style={{ color: "#555" }}>
              Explicación clara de resultados y plan de tratamiento personalizado.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: "#2980b9", marginBottom: "0.8rem" }}>
              4. 💊 Tratamiento
            </h4>
            <p style={{ color: "#555" }}>
              Seguimiento continuo y ajustes según sea necesario.
            </p>
          </div>
        </div>
      </div>

      {/* Estadísticas de citas */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '3rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem' }}>
          📊 Nuestros Especialistas
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
              {medicos.length}
            </div>
            <div style={{ color: '#64748b' }}>Médicos Especialistas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>
              {Database.getPacientes().length}
            </div>
            <div style={{ color: '#64748b' }}>Pacientes Atendidos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9b59b6' }}>
              {new Set(medicos.map(m => m.especialidad)).size}
            </div>
            <div style={{ color: '#64748b' }}>Especialidades</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
              {consultasDisponibles.length}
            </div>
            <div style={{ color: '#64748b' }}>Tipos de Consulta</div>
          </div>
        </div>
      </div>

      {/* Lista de especialistas */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '3rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>
          👨‍⚕️ Nuestro Equipo de Especialistas
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {medicos.slice(0, 8).map((medico, index) => (
            <div key={index} style={{
              padding: '1.5rem',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              backgroundColor: '#f8fafc'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: '#2563eb'
                }}>
                  👨‍⚕️
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{medico.nombre}</div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{medico.especialidad}</div>
                </div>
              </div>
              <div style={{ color: '#475569', fontSize: '0.9rem' }}>
                <div>📞 {medico.telefono}</div>
                <div>📧 {medico.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Llamada a la acción */}
      <div style={{
        textAlign: "center",
        padding: "3rem",
        backgroundColor: "#2c3e50",
        color: "white",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)"
      }}>
        <h3 style={{ 
          marginBottom: "1rem",
          fontSize: "1.8rem"
        }}>
          ¿Necesitas una consulta especializada?
        </h3>
        
        <p style={{ 
          marginBottom: "2rem",
          fontSize: "1.1rem",
          maxWidth: "700px",
          margin: "1rem auto",
          lineHeight: "1.6"
        }}>
          Nuestros especialistas están listos para atenderte con la más alta calidad y tecnología.
          Agenda tu cita hoy mismo y da el primer paso hacia una mejor salud visual.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button 
            onClick={() => {
              if (consultasDisponibles.length > 0) {
                seleccionarConsulta(consultasDisponibles[0]);
              }
            }}
            style={{
              padding: "1rem 2.5rem",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c0392b";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#e74c3c";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Agendar Consulta Ahora
          </button>
          
          <button 
            onClick={() => navigate("/perfil")}
            style={{
              padding: "1rem 2rem",
              backgroundColor: "transparent",
              color: "white",
              border: "2px solid white",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Ver mis citas
          </button>
        </div>
      </div>

      {/* Información de contacto */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "3rem",
        padding: "1.5rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <h4 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>📍 Ubicación</h4>
          <p style={{ color: "#555" }}>Av. Oftalmológica #456, Centro Médico Visión Clara</p>
        </div>
        
        <div>
          <h4 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>📞 Contacto</h4>
          <p style={{ color: "#555" }}>(555) 123-4567</p>
        </div>
        
        <div>
          <h4 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>🕒 Horarios</h4>
          <p style={{ color: "#555" }}>Lun-Vie: 8:00 AM - 6:00 PM</p>
        </div>
      </div>
    </main>
  );
}

export default Consultas;