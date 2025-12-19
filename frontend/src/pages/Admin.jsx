import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Database from '../data/database';

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  
  // Estados para Dashboard
  const [stats, setStats] = useState({
    totalPacientes: 0,
    totalCitas: 0,
    totalMedicos: 0,
    citasHoy: 0,
    citasPendientes: 0,
    ingresosMes: 0,
    tasaOcupacion: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [citasRecientes, setCitasRecientes] = useState([]);
  
  // Estados para Pacientes
  const [pacientes, setPacientes] = useState([]);
  const [searchPaciente, setSearchPaciente] = useState('');
  const [showPacienteForm, setShowPacienteForm] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);
  const [formPaciente, setFormPaciente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    genero: '',
    direccion: '',
    alergias: '',
    enfermedadesCronicas: '',
    tipoSangre: ''
  });
  
  // Estados para Médicos
  const [medicos, setMedicos] = useState([]);
  const [searchMedico, setSearchMedico] = useState('');
  const [showMedicoForm, setShowMedicoForm] = useState(false);
  const [medicoEditando, setMedicoEditando] = useState(null);
  const [formMedico, setFormMedico] = useState({
    nombre: '',
    especialidad: '',
    email: '',
    telefono: '',
    horario: ''
  });
  
  // Estados para Citas
  const [citas, setCitas] = useState([]);
  const [searchCita, setSearchCita] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [showCitaForm, setShowCitaForm] = useState(false);
  const [citaEditando, setCitaEditando] = useState(null);
  const [formCita, setFormCita] = useState({
    pacienteId: '',
    medicoId: '',
    fecha: '',
    hora: '',
    tipo: 'Consulta',
    motivo: '',
    duracion: '30',
    estado: 'Pendiente'
  });
  
  // Estados para Reportes
  const [reporteTipo, setReporteTipo] = useState('citas');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [datosReporte, setDatosReporte] = useState([]);

  useEffect(() => {
    // Verificar autenticación
    const adminLogeado = JSON.parse(localStorage.getItem('adminLogeado'));
    if (!adminLogeado) {
      navigate('/login-admin');
      return;
    }
    setUsuario(adminLogeado);
    
    // Cargar datos iniciales
    cargarDatosIniciales();
    
    // Establecer fechas para reportes
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    setFechaInicio(primerDiaMes.toISOString().split('T')[0]);
    setFechaFin(hoy.toISOString().split('T')[0]);
    
    setLoading(false);
  }, [navigate]);

  const cargarDatosIniciales = () => {
    cargarEstadisticas();
    cargarPacientes();
    cargarMedicos();
    cargarCitas();
    cargarActividadReciente();
  };

  const cargarEstadisticas = () => {
    const pacientesDB = Database.getPacientes();
    const citasDB = Database.getCitas();
    const medicosDB = Database.getMedicos();
    
    const hoy = new Date().toISOString().split('T')[0];
    const citasHoy = citasDB.filter(cita => cita.fecha === hoy);
    const citasPendientes = citasDB.filter(cita => cita.estado === 'Pendiente');
    
    // Calcular ingresos mensuales aproximados
    const ingresosMes = citasDB.filter(cita => {
      const fechaCita = new Date(cita.fecha);
      const ahora = new Date();
      return fechaCita.getMonth() === ahora.getMonth() && 
             fechaCita.getFullYear() === ahora.getFullYear();
    }).length * 800;
    
    setStats({
      totalPacientes: pacientesDB.length,
      totalCitas: citasDB.length,
      totalMedicos: medicosDB.length,
      citasHoy: citasHoy.length,
      citasPendientes: citasPendientes.length,
      ingresosMes,
      tasaOcupacion: citasDB.length > 0 ? Math.round((citasHoy.length / 20) * 100) : 0
    });
    
    // Citas recientes
    const citasOrdenadas = [...citasDB].sort((a, b) => new Date(b.fecha + ' ' + b.hora) - new Date(a.fecha + ' ' + a.hora));
    setCitasRecientes(citasOrdenadas.slice(0, 5));
  };

  const cargarPacientes = () => {
    const pacientesDB = Database.getPacientes();
    setPacientes(pacientesDB);
  };

  const cargarMedicos = () => {
    const medicosDB = Database.getMedicos();
    setMedicos(medicosDB);
  };

  const cargarCitas = () => {
    const citasDB = Database.getCitas();
    setCitas(citasDB);
  };

  const cargarActividadReciente = () => {
    const actividades = [
      { id: 1, tipo: 'sistema', descripcion: 'Backup automático completado', tiempo: 'Hace 2 horas', usuario: 'Sistema' },
      { id: 2, tipo: 'registro', descripcion: 'Nuevo médico registrado', tiempo: 'Hace 5 horas', usuario: 'Admin' },
      { id: 3, tipo: 'cita', descripcion: 'Cita confirmada automáticamente', tiempo: 'Hace 1 día', usuario: 'Sistema' },
      { id: 4, tipo: 'pago', descripcion: 'Pago procesado exitosamente', tiempo: 'Hace 2 días', usuario: 'Sistema' },
      { id: 5, tipo: 'config', descripcion: 'Horarios actualizados', tiempo: 'Hace 3 días', usuario: 'Admin' }
    ];
    setRecentActivity(actividades);
  };

  // ========== FUNCIONES PARA PACIENTES ==========
  const handlePacienteChange = (e) => {
    const { name, value } = e.target;
    setFormPaciente(prev => ({ ...prev, [name]: value }));
  };

  const abrirFormPaciente = (paciente = null) => {
    if (paciente) {
      setPacienteEditando(paciente);
      setFormPaciente({
        nombre: paciente.nombre,
        email: paciente.email,
        telefono: paciente.telefono,
        fechaNacimiento: paciente.fechaNacimiento || '',
        genero: paciente.genero || '',
        direccion: paciente.direccion || '',
        alergias: paciente.alergias || '',
        enfermedadesCronicas: paciente.enfermedadesCronicas || '',
        tipoSangre: paciente.tipoSangre || ''
      });
    } else {
      setPacienteEditando(null);
      setFormPaciente({
        nombre: '',
        email: '',
        telefono: '',
        fechaNacimiento: '',
        genero: '',
        direccion: '',
        alergias: '',
        enfermedadesCronicas: '',
        tipoSangre: ''
      });
    }
    setShowPacienteForm(true);
  };

  const guardarPaciente = (e) => {
    e.preventDefault();
    
    if (pacienteEditando) {
      // Actualizar paciente
      Database.updatePaciente(pacienteEditando.id, formPaciente);
      alert('✅ Paciente actualizado exitosamente');
    } else {
      // Crear nuevo paciente
      const nuevoPaciente = {
        ...formPaciente,
        fechaRegistro: new Date().toISOString().split('T')[0]
      };
      Database.addPaciente(nuevoPaciente);
      alert('✅ Paciente creado exitosamente');
    }
    
    setShowPacienteForm(false);
    cargarPacientes();
    cargarEstadisticas();
  };

  const eliminarPaciente = (id) => {
    if (window.confirm('¿Está seguro de eliminar este paciente? Esta acción no se puede deshacer.')) {
      const db = Database.getDB();
      db.pacientes = db.pacientes.filter(p => p.id !== id);
      // También eliminar citas asociadas
      db.citas = db.citas.filter(c => c.pacienteId !== id);
      Database.saveDB(db);
      alert('✅ Paciente eliminado exitosamente');
      cargarPacientes();
      cargarCitas();
      cargarEstadisticas();
    }
  };

  // ========== FUNCIONES PARA MÉDICOS ==========
  const handleMedicoChange = (e) => {
    const { name, value } = e.target;
    setFormMedico(prev => ({ ...prev, [name]: value }));
  };

  const abrirFormMedico = (medico = null) => {
    if (medico) {
      setMedicoEditando(medico);
      setFormMedico({
        nombre: medico.nombre,
        especialidad: medico.especialidad,
        email: medico.email,
        telefono: medico.telefono || '',
        horario: medico.horario || ''
      });
    } else {
      setMedicoEditando(null);
      setFormMedico({
        nombre: '',
        especialidad: '',
        email: '',
        telefono: '',
        horario: ''
      });
    }
    setShowMedicoForm(true);
  };

  const guardarMedico = (e) => {
    e.preventDefault();
    
    if (medicoEditando) {
      // Actualizar médico en la base de datos
      const db = Database.getDB();
      const index = db.medicos.findIndex(m => m.id === medicoEditando.id);
      if (index !== -1) {
        db.medicos[index] = { ...db.medicos[index], ...formMedico };
        Database.saveDB(db);
      }
      alert('✅ Médico actualizado exitosamente');
    } else {
      // Crear nuevo médico
      const nuevoMedico = {
        ...formMedico,
        id: Database.getMedicos().length > 0 ? Math.max(...Database.getMedicos().map(m => m.id)) + 1 : 1
      };
      
      const db = Database.getDB();
      db.medicos.push(nuevoMedico);
      Database.saveDB(db);
      alert('✅ Médico creado exitosamente');
    }
    
    setShowMedicoForm(false);
    cargarMedicos();
    cargarEstadisticas();
  };

  const eliminarMedico = (id) => {
    if (window.confirm('¿Está seguro de eliminar este médico? Las citas asociadas serán reasignadas.')) {
      const db = Database.getDB();
      db.medicos = db.medicos.filter(m => m.id !== id);
      // Reasignar citas a otro médico si es posible
      if (db.medicos.length > 0) {
        const medicoAlternativo = db.medicos[0];
        db.citas = db.citas.map(cita => {
          if (cita.medicoId === id) {
            return { ...cita, medicoId: medicoAlternativo.id, medicoNombre: medicoAlternativo.nombre };
          }
          return cita;
        });
      }
      Database.saveDB(db);
      alert('✅ Médico eliminado exitosamente');
      cargarMedicos();
      cargarCitas();
      cargarEstadisticas();
    }
  };

  // ========== FUNCIONES PARA CITAS ==========
  const handleCitaChange = (e) => {
    const { name, value } = e.target;
    setFormCita(prev => ({ ...prev, [name]: value }));
  };

  const abrirFormCita = (cita = null) => {
    if (cita) {
      setCitaEditando(cita);
      setFormCita({
        pacienteId: cita.pacienteId,
        medicoId: cita.medicoId,
        fecha: cita.fecha,
        hora: cita.hora,
        tipo: cita.tipo,
        motivo: cita.motivo,
        duracion: cita.duracion || '30',
        estado: cita.estado
      });
    } else {
      setCitaEditando(null);
      setFormCita({
        pacienteId: '',
        medicoId: '',
        fecha: new Date().toISOString().split('T')[0],
        hora: '09:00',
        tipo: 'Consulta',
        motivo: '',
        duracion: '30',
        estado: 'Pendiente'
      });
    }
    setShowCitaForm(true);
  };

  const guardarCita = (e) => {
    e.preventDefault();
    
    const pacienteSeleccionado = pacientes.find(p => p.id === parseInt(formCita.pacienteId));
    const medicoSeleccionado = medicos.find(m => m.id === parseInt(formCita.medicoId));
    
    if (!pacienteSeleccionado || !medicoSeleccionado) {
      alert('❌ Debe seleccionar paciente y médico válidos');
      return;
    }
    
    if (citaEditando) {
      // Actualizar cita
      const db = Database.getDB();
      const index = db.citas.findIndex(c => c.id === citaEditando.id);
      if (index !== -1) {
        db.citas[index] = {
          ...db.citas[index],
          ...formCita,
          pacienteId: parseInt(formCita.pacienteId),
          pacienteNombre: pacienteSeleccionado.nombre,
          medicoId: parseInt(formCita.medicoId),
          medicoNombre: medicoSeleccionado.nombre
        };
        Database.saveDB(db);
      }
      alert('✅ Cita actualizada exitosamente');
    } else {
      // Crear nueva cita
      const nuevaCita = {
        ...formCita,
        id: Database.getCitas().length > 0 ? Math.max(...Database.getCitas().map(c => c.id)) + 1 : 1,
        pacienteId: parseInt(formCita.pacienteId),
        pacienteNombre: pacienteSeleccionado.nombre,
        medicoId: parseInt(formCita.medicoId),
        medicoNombre: medicoSeleccionado.nombre,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      
      Database.addCita(nuevaCita);
      alert('✅ Cita creada exitosamente');
    }
    
    setShowCitaForm(false);
    cargarCitas();
    cargarEstadisticas();
  };

  const eliminarCita = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta cita?')) {
      const db = Database.getDB();
      db.citas = db.citas.filter(c => c.id !== id);
      Database.saveDB(db);
      alert('✅ Cita eliminada exitosamente');
      cargarCitas();
      cargarEstadisticas();
    }
  };

  // ========== FUNCIONES PARA REPORTES ==========
  const generarReporte = () => {
    let datos = [];
    
    switch (reporteTipo) {
      case 'citas':
        datos = Database.getCitas().filter(cita => {
          const fechaCita = new Date(cita.fecha);
          const inicio = new Date(fechaInicio);
          const fin = new Date(fechaFin);
          return fechaCita >= inicio && fechaCita <= fin;
        });
        break;
        
      case 'pacientes':
        datos = Database.getPacientes().filter(paciente => {
          const fechaRegistro = new Date(paciente.fechaRegistro);
          const inicio = new Date(fechaInicio);
          const fin = new Date(fechaFin);
          return fechaRegistro >= inicio && fechaRegistro <= fin;
        });
        break;
        
      case 'ingresos':
        // Simular ingresos por cita
        const citasPeriodo = Database.getCitas().filter(cita => {
          const fechaCita = new Date(cita.fecha);
          const inicio = new Date(fechaInicio);
          const fin = new Date(fechaFin);
          return fechaCita >= inicio && fechaCita <= fin;
        });
        
        datos = citasPeriodo.map(cita => ({
          ...cita,
          ingreso: 800 // Valor fijo por cita
        }));
        break;
    }
    
    setDatosReporte(datos);
  };

  const exportarReporte = () => {
    if (datosReporte.length === 0) {
      alert('No hay datos para exportar. Genere un reporte primero.');
      return;
    }
    
    let contenido = '';
    const headers = Object.keys(datosReporte[0]);
    contenido += headers.join(',') + '\n';
    
    datosReporte.forEach(item => {
      const row = headers.map(header => {
        const value = item[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',');
      contenido += row + '\n';
    });
    
    const blob = new Blob([contenido], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_${reporteTipo}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    alert('✅ Reporte exportado exitosamente');
  };

  // ========== FUNCIONES DEL SISTEMA ==========
  const handleExportBackup = () => {
    const db = Database.getDB();
    const dataStr = JSON.stringify(db, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `backup_clinica_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('✅ Backup exportado exitosamente');
  };

  const handleImportBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const backupData = JSON.parse(event.target.result);
        localStorage.setItem('cunicatorDB', JSON.stringify(backupData));
        alert('✅ Backup importado exitosamente. Recargando...');
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        alert('❌ Error al importar backup: Formato inválido');
      }
    };
    reader.readAsText(file);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLogeado');
    navigate('/login-admin');
  };

  const handleResetSystem = () => {
    if (window.confirm('⚠️ ¿ESTÁ SEGURO? Esta acción reseteará toda la base de datos a los valores iniciales. Esta acción NO se puede deshacer.')) {
      localStorage.removeItem('cunicatorDB');
      Database.init();
      alert('✅ Sistema reseteado exitosamente. Recargando...');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#9b59b6'
      }}>
        Cargando panel administrativo...
      </div>
    );
  }

  // ========== RENDERIZADO POR TABS ==========
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'pacientes':
        return renderPacientes();
      case 'medicos':
        return renderMedicos();
      case 'citas':
        return renderCitas();
      case 'reportes':
        return renderReportes();
      case 'configuracion':
        return renderConfiguracion();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Estadísticas Principales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderTop: '4px solid #3498db',
          cursor: 'pointer'
        }} onClick={() => setActiveTab('pacientes')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
                {stats.totalPacientes}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Pacientes</div>
            </div>
            <div style={{ fontSize: '1.5rem' }}>👥</div>
          </div>
          <div style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
            Gestionar pacientes →
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderTop: '4px solid #2ecc71',
          cursor: 'pointer'
        }} onClick={() => setActiveTab('citas')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>
                {stats.totalCitas}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Citas Totales</div>
            </div>
            <div style={{ fontSize: '1.5rem' }}>📅</div>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
            <span style={{ color: '#2ecc71' }}>{stats.citasHoy} hoy</span> • 
            <span style={{ color: '#e74c3c', marginLeft: '0.5rem' }}>{stats.citasPendientes} pendientes</span>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderTop: '4px solid #e74c3c',
          cursor: 'pointer'
        }} onClick={() => setActiveTab('medicos')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                {stats.totalMedicos}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Médicos</div>
            </div>
            <div style={{ fontSize: '1.5rem' }}>👨‍⚕️</div>
          </div>
          <div style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
            Especialistas activos
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          borderTop: '4px solid #f39c12',
          cursor: 'pointer'
        }} onClick={() => setActiveTab('reportes')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
                {'$' + stats.ingresosMes.toLocaleString()}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Ingresos Mensuales</div>
            </div>
            <div style={{ fontSize: '1.5rem' }}>💰</div>
          </div>
          <div style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
            Estimado basado en citas
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Citas Recientes */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📅 Citas Recientes
            <button 
              onClick={() => setActiveTab('citas')}
              style={{
                marginLeft: 'auto',
                padding: '0.3rem 0.8rem',
                backgroundColor: '#e2e8f0',
                color: '#475569',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Ver todas
            </button>
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Paciente</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Médico</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Fecha</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citasRecientes.map(cita => (
                  <tr key={cita.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem', color: '#1e293b' }}>{cita.pacienteNombre}</td>
                    <td style={{ padding: '0.75rem', color: '#475569' }}>{cita.medicoNombre}</td>
                    <td style={{ padding: '0.75rem', color: '#475569' }}>{cita.fecha} {cita.hora}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        backgroundColor: 
                          cita.estado === 'Confirmada' ? '#d4edda' :
                          cita.estado === 'Pendiente' ? '#fff3cd' : 
                          cita.estado === 'Cancelada' ? '#f8d7da' : '#e2e8f0',
                        color: 
                          cita.estado === 'Confirmada' ? '#155724' :
                          cita.estado === 'Pendiente' ? '#856404' :
                          cita.estado === 'Cancelada' ? '#721c24' : '#475569'
                      }}>
                        {cita.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Actividad Reciente</h2>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {recentActivity.map(activity => (
              <div key={activity.id} style={{
                padding: '1rem',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 
                    activity.tipo === 'registro' ? '#e3f2fd' :
                    activity.tipo === 'cita' ? '#fff3cd' :
                    activity.tipo === 'pago' ? '#d4edda' : '#f8d7da',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 
                    activity.tipo === 'registro' ? '#3498db' :
                    activity.tipo === 'cita' ? '#f39c12' :
                    activity.tipo === 'pago' ? '#2ecc71' : '#e74c3c',
                  fontSize: '1rem'
                }}>
                  {activity.tipo === 'registro' ? '👤' :
                   activity.tipo === 'cita' ? '📅' :
                   activity.tipo === 'pago' ? '💰' : '⚙️'}
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 0.25rem 0', color: '#1e293b', fontWeight: '500' }}>
                    {activity.descripcion}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{activity.usuario}</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{activity.tiempo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderPacientes = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          👥 Gestión de Pacientes
          <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>
            ({pacientes.length} registros)
          </span>
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchPaciente}
            onChange={(e) => setSearchPaciente(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              width: '250px'
            }}
          />
          <button 
            onClick={() => abrirFormPaciente()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            + Nuevo Paciente
          </button>
        </div>
      </div>

      {/* Formulario de Paciente */}
      {showPacienteForm && (
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>
            {pacienteEditando ? '✏️ Editar Paciente' : '➕ Nuevo Paciente'}
          </h3>
          
          <form onSubmit={guardarPaciente}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formPaciente.nombre}
                  onChange={handlePacienteChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formPaciente.email}
                  onChange={handlePacienteChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formPaciente.telefono}
                  onChange={handlePacienteChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formPaciente.fechaNacimiento}
                  onChange={handlePacienteChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Tipo de Sangre
                </label>
                <select
                  name="tipoSangre"
                  value={formPaciente.tipoSangre}
                  onChange={handlePacienteChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
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
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Género
                </label>
                <select
                  name="genero"
                  value={formPaciente.genero}
                  onChange={handlePacienteChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={formPaciente.direccion}
                onChange={handlePacienteChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: 'white'
                }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Alergias
                </label>
                <textarea
                  name="alergias"
                  value={formPaciente.alergias}
                  onChange={handlePacienteChange}
                  rows="3"
                  placeholder="Lista de alergias, separadas por coma..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Enfermedades Crónicas
                </label>
                <textarea
                  name="enfermedadesCronicas"
                  value={formPaciente.enfermedadesCronicas}
                  onChange={handlePacienteChange}
                  rows="3"
                  placeholder="Enfermedades crónicas, separadas por coma..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setShowPacienteForm(false)}
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
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {pacienteEditando ? 'Actualizar' : 'Crear'} Paciente
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Pacientes */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>ID</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Nombre</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Contacto</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Registro</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes
              .filter(paciente => 
                !searchPaciente || 
                paciente.nombre.toLowerCase().includes(searchPaciente.toLowerCase()) ||
                paciente.email.toLowerCase().includes(searchPaciente.toLowerCase()) ||
                paciente.telefono.includes(searchPaciente)
              )
              .map(paciente => (
                <tr key={paciente.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem', color: '#64748b', fontWeight: '500' }}>#{paciente.id}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ color: '#1e293b', fontWeight: '500' }}>{paciente.nombre}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                      {paciente.tipoSangre || 'Sin tipo de sangre'}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ color: '#475569' }}>{paciente.email}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{paciente.telefono}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#64748b' }}>{paciente.fechaRegistro}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => abrirFormPaciente(paciente)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#e2e8f0',
                          color: '#475569',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => eliminarPaciente(paciente.id)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
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
  );

  const renderMedicos = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          👨‍⚕️ Gestión de Médicos
          <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>
            ({medicos.length} registros)
          </span>
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Buscar médico..."
            value={searchMedico}
            onChange={(e) => setSearchMedico(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              width: '250px'
            }}
          />
          <button 
            onClick={() => abrirFormMedico()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            + Nuevo Médico
          </button>
        </div>
      </div>

      {/* Formulario de Médico */}
      {showMedicoForm && (
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>
            {medicoEditando ? '✏️ Editar Médico' : '➕ Nuevo Médico'}
          </h3>
          
          <form onSubmit={guardarMedico}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formMedico.nombre}
                  onChange={handleMedicoChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                  placeholder="Dr. Nombre Apellido"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Especialidad *
                </label>
                <select
                  name="especialidad"
                  value={formMedico.especialidad}
                  onChange={handleMedicoChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Seleccionar especialidad...</option>
                  <option value="Oftalmología General">Oftalmología General</option>
                  <option value="Glaucoma">Glaucoma</option>
                  <option value="Retina">Retina</option>
                  <option value="Cataratas">Cataratas</option>
                  <option value="Pediatría Oftalmológica">Pediatría Oftalmológica</option>
                  <option value="Córnea">Córnea</option>
                  <option value="Estrabismo">Estrabismo</option>
                  <option value="Oculoplástica">Oculoplástica</option>
                  <option value="Cirugía Refractiva">Cirugía Refractiva</option>
                  <option value="Neurooftalmología">Neurooftalmología</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formMedico.email}
                  onChange={handleMedicoChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                  placeholder="medico@clinica.com"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formMedico.telefono}
                  onChange={handleMedicoChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                  placeholder="555-123-4567"
                />
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Horario
                </label>
                <input
                  type="text"
                  name="horario"
                  value={formMedico.horario}
                  onChange={handleMedicoChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                  placeholder="Ej: Lunes a Viernes: 8:00 AM - 5:00 PM"
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setShowMedicoForm(false)}
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
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {medicoEditando ? 'Actualizar' : 'Crear'} Médico
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Médicos */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>ID</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Nombre</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Especialidad</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Contacto</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicos
              .filter(medico => 
                !searchMedico || 
                medico.nombre.toLowerCase().includes(searchMedico.toLowerCase()) ||
                medico.especialidad.toLowerCase().includes(searchMedico.toLowerCase())
              )
              .map(medico => (
                <tr key={medico.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem', color: '#64748b', fontWeight: '500' }}>#{medico.id}</td>
                  <td style={{ padding: '0.75rem', color: '#1e293b', fontWeight: '500' }}>{medico.nombre}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      backgroundColor: '#e3f2fd',
                      color: '#3498db',
                      fontWeight: '500'
                    }}>
                      {medico.especialidad}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ color: '#475569' }}>{medico.email}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{medico.telefono || 'Sin teléfono'}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => abrirFormMedico(medico)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#e2e8f0',
                          color: '#475569',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => eliminarMedico(medico.id)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
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
  );

  const renderCitas = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          📅 Gestión de Citas
          <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>
            ({citas.length} citas)
          </span>
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Buscar cita..."
            value={searchCita}
            onChange={(e) => setSearchCita(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              width: '200px'
            }}
          />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              backgroundColor: 'white'
            }}
          >
            <option value="todos">Todos los estados</option>
            <option value="Confirmada">Confirmadas</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Cancelada">Canceladas</option>
            <option value="Completada">Completadas</option>
          </select>
          <button 
            onClick={() => abrirFormCita()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            + Nueva Cita
          </button>
        </div>
      </div>

      {/* Formulario de Cita */}
      {showCitaForm && (
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>
            {citaEditando ? '✏️ Editar Cita' : '➕ Nueva Cita'}
          </h3>
          
          <form onSubmit={guardarCita}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Paciente *
                </label>
                <select
                  name="pacienteId"
                  value={formCita.pacienteId}
                  onChange={handleCitaChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Seleccionar paciente...</option>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nombre} - {paciente.email}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Médico *
                </label>
                <select
                  name="medicoId"
                  value={formCita.medicoId}
                  onChange={handleCitaChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Seleccionar médico...</option>
                  {medicos.map(medico => (
                    <option key={medico.id} value={medico.id}>
                      {medico.nombre} - {medico.especialidad}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Fecha *
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formCita.fecha}
                  onChange={handleCitaChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Hora *
                </label>
                <select
                  name="hora"
                  value={formCita.hora}
                  onChange={handleCitaChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  {Array.from({ length: 13 }, (_, i) => i + 8).map(hora => (
                    <option key={hora} value={`${hora.toString().padStart(2, '0')}:00`}>
                      {hora}:00
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Tipo
                </label>
                <select
                  name="tipo"
                  value={formCita.tipo}
                  onChange={handleCitaChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="Consulta">Consulta</option>
                  <option value="Control">Control</option>
                  <option value="Examen">Examen</option>
                  <option value="Cirugía">Cirugía</option>
                  <option value="Revisión">Revisión</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Estado
                </label>
                <select
                  name="estado"
                  value={formCita.estado}
                  onChange={handleCitaChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Completada">Completada</option>
                </select>
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Duración (minutos)
              </label>
              <select
                name="duracion"
                value={formCita.duracion}
                onChange={handleCitaChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: 'white'
                }}
              >
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="45">45 minutos</option>
                <option value="60">60 minutos</option>
                <option value="90">90 minutos</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Motivo
              </label>
              <textarea
                name="motivo"
                value={formCita.motivo}
                onChange={handleCitaChange}
                rows="3"
                placeholder="Descripción del motivo de la cita..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setShowCitaForm(false)}
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
                {citaEditando ? 'Actualizar' : 'Crear'} Cita
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Citas */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>ID</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Paciente</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Médico</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Fecha/Hora</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Estado</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas
              .filter(cita => 
                (filtroEstado === 'todos' || cita.estado === filtroEstado) &&
                (!searchCita || 
                  cita.pacienteNombre.toLowerCase().includes(searchCita.toLowerCase()) ||
                  cita.medicoNombre.toLowerCase().includes(searchCita.toLowerCase()) ||
                  cita.tipo.toLowerCase().includes(searchCita.toLowerCase()))
              )
              .map(cita => (
                <tr key={cita.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem', color: '#64748b', fontWeight: '500' }}>#{cita.id}</td>
                  <td style={{ padding: '0.75rem', color: '#1e293b', fontWeight: '500' }}>{cita.pacienteNombre}</td>
                  <td style={{ padding: '0.75rem', color: '#475569' }}>{cita.medicoNombre}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ color: '#1e293b', fontWeight: '500' }}>{cita.fecha}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{cita.hora}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      backgroundColor: 
                        cita.estado === 'Confirmada' ? '#d4edda' :
                        cita.estado === 'Pendiente' ? '#fff3cd' : 
                        cita.estado === 'Cancelada' ? '#f8d7da' :
                        cita.estado === 'Completada' ? '#d1e7dd' : '#e2e8f0',
                      color: 
                        cita.estado === 'Confirmada' ? '#155724' :
                        cita.estado === 'Pendiente' ? '#856404' :
                        cita.estado === 'Cancelada' ? '#721c24' :
                        cita.estado === 'Completada' ? '#0f5132' : '#475569'
                    }}>
                      {cita.estado}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => abrirFormCita(cita)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#e2e8f0',
                          color: '#475569',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => eliminarCita(cita.id)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
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
  );

  const renderReportes = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ color: '#1e293b', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        📊 Reportes y Estadísticas
      </h2>
      
      {/* Filtros de Reporte */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem' }}>Configurar Reporte</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
              Tipo de Reporte
            </label>
            <select
              value={reporteTipo}
              onChange={(e) => setReporteTipo(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: 'white'
              }}
            >
              <option value="citas">Citas por período</option>
              <option value="pacientes">Registro de pacientes</option>
              <option value="ingresos">Ingresos financieros</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
              Fecha Inicio
            </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: 'white'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
              Fecha Fin
            </label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: 'white'
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={generarReporte}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Generar Reporte
          </button>
          
          <button 
            onClick={exportarReporte}
            disabled={datosReporte.length === 0}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: datosReporte.length === 0 ? '#e2e8f0' : '#2ecc71',
              color: datosReporte.length === 0 ? '#94a3b8' : 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: datosReporte.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Exportar a CSV
          </button>
        </div>
      </div>
      
      {/* Resultados del Reporte */}
      {datosReporte.length > 0 && (
        <div>
          <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>
            Resultados: {datosReporte.length} registros encontrados
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  {Object.keys(datosReporte[0]).map(key => (
                    <th key={key} style={{ padding: '0.75rem', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datosReporte.slice(0, 10).map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    {Object.values(item).map((value, i) => (
                      <td key={i} style={{ padding: '0.75rem', color: '#475569' }}>
                        {typeof value === 'object' ? JSON.stringify(value) : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {datosReporte.length > 10 && (
            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
              Mostrando 10 de {datosReporte.length} registros. Exporte el reporte para ver todos los datos.
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderConfiguracion = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ color: '#1e293b', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        ⚙️ Configuración del Sistema
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Backup */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            💾 Backup del Sistema
          </h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Realice copias de seguridad de toda la base de datos para prevenir pérdida de información.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={handleExportBackup}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Exportar Backup
            </button>
            <label style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#e2e8f0',
              color: '#475569',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'inline-block'
            }}>
              Importar Backup
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
        
        {/* Estadísticas del Sistema */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📈 Estadísticas
          </h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Tamaño de BD:</span>
              <span style={{ color: '#1e293b', fontWeight: '500' }}>
                {Math.round(JSON.stringify(Database.getDB()).length / 1024)} KB
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Última modificación:</span>
              <span style={{ color: '#1e293b', fontWeight: '500' }}>Hoy</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Versión del sistema:</span>
              <span style={{ color: '#1e293b', fontWeight: '500' }}>1.0.0</span>
            </div>
          </div>
        </div>
        
        {/* Configuración Peligrosa */}
        <div style={{
          backgroundColor: '#fef2f2',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <h3 style={{ color: '#dc2626', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚠️ Zona de Peligro
          </h3>
          <p style={{ color: '#7c2d12', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Estas acciones son irreversibles. Use con extrema precaución.
          </p>
          <button 
            onClick={handleResetSystem}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              width: '100%'
            }}
          >
            Resetear Sistema Completo
          </button>
        </div>
      </div>
    </div>
  );

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
              backgroundColor: "#9b59b6",
              width: "45px",
              height: "45px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}>
              🔧
            </span>
            Panel Administrativo
          </h1>
          <p style={{ 
            color: "#64748b", 
            margin: "0.5rem 0 0",
            fontSize: "1rem"
          }}>
            Gestión completa del sistema y reportes
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
            <span style={{ color: "#64748b" }}>👑</span>
            <span style={{ color: "#1e293b", fontWeight: "500" }}>
              {usuario ? usuario.nombre : 'Administrador'}
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

      {/* Navegación por Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        marginBottom: '2rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '0.25rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'dashboard' ? '#3498db' : 'transparent',
            color: activeTab === 'dashboard' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          📊 Dashboard
        </button>
        
        <button
          onClick={() => setActiveTab('pacientes')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'pacientes' ? '#3498db' : 'transparent',
            color: activeTab === 'pacientes' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          👥 Pacientes
        </button>
        
        <button
          onClick={() => setActiveTab('medicos')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'medicos' ? '#e74c3c' : 'transparent',
            color: activeTab === 'medicos' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          👨‍⚕️ Médicos
        </button>
        
        <button
          onClick={() => setActiveTab('citas')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'citas' ? '#2ecc71' : 'transparent',
            color: activeTab === 'citas' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          📅 Citas
        </button>
        
        <button
          onClick={() => setActiveTab('reportes')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'reportes' ? '#f39c12' : 'transparent',
            color: activeTab === 'reportes' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          📊 Reportes
        </button>
        
        <button
          onClick={() => setActiveTab('configuracion')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'configuracion' ? '#9b59b6' : 'transparent',
            color: activeTab === 'configuracion' ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ⚙️ Configuración
        </button>
      </div>

      {/* Contenido de la Tab Activa */}
      {renderTabContent()}

      {/* Footer de Estadísticas */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <span>👥 {stats.totalPacientes} pacientes</span>
          <span>👨‍⚕️ {stats.totalMedicos} médicos</span>
          <span>📅 {stats.totalCitas} citas totales</span>
          <span>💰 ${stats.ingresosMes.toLocaleString()} ingresos estimados</span>
          <span>⏱️ Última actualización: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </main>
  );
}

export default Admin;