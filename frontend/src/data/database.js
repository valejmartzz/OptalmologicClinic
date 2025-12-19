// Base de datos centralizada para toda la aplicación
const Database = {
  // Inicializar base de datos
  init() {
    if (!localStorage.getItem('cunicatorDB')) {
      const initialDB = {
        pacientes: [
          {
            id: 1,
            nombre: "Ana García",
            edad: 34,
            email: "ana@email.com",
            password: "ana123",
            telefono: "555-0101",
            direccion: "Calle Principal 123",
            alergias: "Penicilina",
            enfermedadesCronicas: "Hipertensión",
            tipoSangre: "O+",
            fechaRegistro: "2023-01-15"
          },
          {
            id: 2,
            nombre: "Carlos Rodríguez",
            edad: 45,
            email: "carlos@email.com",
            password: "carlos123",
            telefono: "555-0102",
            direccion: "Avenida Central 456",
            alergias: "Ninguna",
            enfermedadesCronicas: "Diabetes",
            tipoSangre: "A+",
            fechaRegistro: "2023-02-20"
          },
          {
            id: 3,
            nombre: "María López",
            edad: 28,
            email: "maria@email.com",
            password: "maria123",
            telefono: "555-0103",
            direccion: "Calle Secundaria 789",
            alergias: "Aspirina",
            enfermedadesCronicas: "Asma",
            tipoSangre: "B-",
            fechaRegistro: "2023-03-10"
          }
        ],
        citas: [
          {
            id: 1,
            pacienteId: 1,
            pacienteNombre: "Ana García",
            medicoId: 1,
            medicoNombre: "Dr. Carlos Méndez",
            fecha: "2024-04-01",
            hora: "09:00",
            tipo: "Control",
            motivo: "Control de hipertensión",
            estado: "Confirmada",
            duracion: "30",
            fechaCreacion: "2024-03-25"
          },
          {
            id: 2,
            pacienteId: 2,
            pacienteNombre: "Carlos Rodríguez",
            medicoId: 2,
            medicoNombre: "Dra. Ana Rodríguez",
            fecha: "2024-04-01",
            hora: "10:30",
            tipo: "Consulta",
            motivo: "Control diabetes",
            estado: "Confirmada",
            duracion: "30",
            fechaCreacion: "2024-03-26"
          },
          {
            id: 3,
            pacienteId: 3,
            pacienteNombre: "María López",
            medicoId: 3,
            medicoNombre: "Dr. Luis Fernández",
            fecha: "2024-04-02",
            hora: "11:45",
            tipo: "Examen",
            motivo: "Examen de rutina",
            estado: "Pendiente",
            duracion: "45",
            fechaCreacion: "2024-03-27"
          }
        ],
        notasMedicas: [
          {
            id: 1,
            pacienteId: 1,
            medicoId: 1,
            medicoNombre: "Dr. Carlos Méndez",
            fecha: "2024-03-10",
            motivo: "Control hipertensión",
            diagnostico: "Hipertensión controlada",
            tratamiento: "Continuar medicación actual",
            medicamentos: ["Losartan 50mg", "Hidroclorotiazida 12.5mg"],
            observaciones: "Presión arterial 120/80",
            proximaCita: "2024-04-01"
          }
        ],
        medicos: [
          {
            id: 1,
            nombre: "Dr. Carlos Méndez",
            especialidad: "Oftalmología General",
            email: "carlos.mendez@hospital.com",
            telefono: "555-1001",
            horario: "Lunes a Viernes: 8:00 AM - 5:00 PM"
          },
          {
            id: 2,
            nombre: "Dra. Ana Rodríguez",
            especialidad: "Glaucoma",
            email: "ana.rodriguez@hospital.com",
            telefono: "555-1002",
            horario: "Lunes a Viernes: 9:00 AM - 6:00 PM"
          },
          {
            id: 3,
            nombre: "Dr. Luis Fernández",
            especialidad: "Retina",
            email: "luis.fernandez@hospital.com",
            telefono: "555-1003",
            horario: "Lunes a Viernes: 8:00 AM - 4:00 PM"
          },
          {
            id: 4,
            nombre: "Dr. Roberto Sánchez",
            especialidad: "Cataratas",
            email: "roberto.sanchez@hospital.com",
            telefono: "555-1004",
            horario: "Lunes a Viernes: 10:00 AM - 7:00 PM"
          },
          {
            id: 5,
            nombre: "Dra. María González",
            especialidad: "Pediatría Oftalmológica",
            email: "maria.gonzalez@hospital.com",
            telefono: "555-1005",
            horario: "Lunes a Viernes: 8:00 AM - 5:00 PM"
          },
          {
            id: 6,
            nombre: "Dr. Javier López",
            especialidad: "Córnea",
            email: "javier.lopez@hospital.com",
            telefono: "555-1006",
            horario: "Lunes a Viernes: 9:00 AM - 6:00 PM"
          },
          {
            id: 7,
            nombre: "Dra. Laura Martínez",
            especialidad: "Estrabismo",
            email: "laura.martinez@hospital.com",
            telefono: "555-1007",
            horario: "Lunes a Viernes: 8:00 AM - 4:00 PM"
          },
          {
            id: 8,
            nombre: "Dr. Andrés Ramírez",
            especialidad: "Oculoplástica",
            email: "andres.ramirez@hospital.com",
            telefono: "555-1008",
            horario: "Lunes a Viernes: 10:00 AM - 7:00 PM"
          },
          {
            id: 9,
            nombre: "Dr. Pedro Vargas",
            especialidad: "Cirugía Refractiva",
            email: "pedro.vargas@hospital.com",
            telefono: "555-1009",
            horario: "Lunes a Viernes: 8:00 AM - 5:00 PM"
          },
          {
            id: 10,
            nombre: "Dra. Sofía Castro",
            especialidad: "Neurooftalmología",
            email: "sofia.castro@hospital.com",
            telefono: "555-1010",
            horario: "Lunes a Viernes: 9:00 AM - 6:00 PM"
          }
        ]
      };
      localStorage.setItem('cunicatorDB', JSON.stringify(initialDB));
    }
  },

  // Obtener toda la base de datos
  getDB() {
    const db = localStorage.getItem('cunicatorDB');
    return db ? JSON.parse(db) : null;
  },

  // Guardar base de datos
  saveDB(db) {
    localStorage.setItem('cunicatorDB', JSON.stringify(db));
  },

  // ========== MÉTODOS PARA PACIENTES ==========
  getPacientes() {
    const db = this.getDB();
    return db ? db.pacientes : [];
  },

  getPacienteById(id) {
    const pacientes = this.getPacientes();
    return pacientes.find(p => p.id === id);
  },

  addPaciente(paciente) {
    const db = this.getDB();
    if (!db) return null;
    
    // Generar nuevo ID
    const nuevoId = db.pacientes.length > 0 ? Math.max(...db.pacientes.map(p => p.id)) + 1 : 1;
    
    const nuevoPaciente = {
      ...paciente,
      id: nuevoId,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    
    db.pacientes.push(nuevoPaciente);
    this.saveDB(db);
    return nuevoPaciente;
  },

  updatePaciente(id, datosActualizados) {
    const db = this.getDB();
    if (!db) return null;
    
    const index = db.pacientes.findIndex(p => p.id === id);
    if (index !== -1) {
      db.pacientes[index] = { ...db.pacientes[index], ...datosActualizados };
      this.saveDB(db);
      return db.pacientes[index];
    }
    return null;
  },

  deletePaciente(id) {
    const db = this.getDB();
    if (!db) return false;
    
    const pacientesFiltrados = db.pacientes.filter(p => p.id !== id);
    if (pacientesFiltrados.length === db.pacientes.length) {
      return false; // No se encontró el paciente
    }
    
    // También eliminar citas asociadas
    db.citas = db.citas.filter(c => c.pacienteId !== id);
    
    db.pacientes = pacientesFiltrados;
    this.saveDB(db);
    return true;
  },

  // ========== MÉTODOS PARA MÉDICOS ==========
  getMedicos() {
    const db = this.getDB();
    return db ? db.medicos : [];
  },

  getMedicoById(id) {
    const medicos = this.getMedicos();
    return medicos.find(m => m.id === id);
  },

  addMedico(medico) {
    const db = this.getDB();
    if (!db) return null;
    
    const nuevoId = db.medicos.length > 0 ? Math.max(...db.medicos.map(m => m.id)) + 1 : 1;
    
    const nuevoMedico = {
      ...medico,
      id: nuevoId
    };
    
    db.medicos.push(nuevoMedico);
    this.saveDB(db);
    return nuevoMedico;
  },

  updateMedico(id, datosActualizados) {
    const db = this.getDB();
    if (!db) return null;
    
    const index = db.medicos.findIndex(m => m.id === id);
    if (index !== -1) {
      db.medicos[index] = { ...db.medicos[index], ...datosActualizados };
      this.saveDB(db);
      return db.medicos[index];
    }
    return null;
  },

  deleteMedico(id) {
    const db = this.getDB();
    if (!db) return false;
    
    const medicosFiltrados = db.medicos.filter(m => m.id !== id);
    if (medicosFiltrados.length === db.medicos.length) {
      return false;
    }
    
    // Reasignar citas a otro médico si es posible
    if (medicosFiltrados.length > 0) {
      const medicoAlternativo = medicosFiltrados[0];
      db.citas = db.citas.map(cita => {
        if (cita.medicoId === id) {
          return {
            ...cita,
            medicoId: medicoAlternativo.id,
            medicoNombre: medicoAlternativo.nombre
          };
        }
        return cita;
      });
    }
    
    db.medicos = medicosFiltrados;
    this.saveDB(db);
    return true;
  },

  // ========== MÉTODOS PARA CITAS ==========
  getCitas() {
    const db = this.getDB();
    return db ? db.citas : [];
  },

  getCitaById(id) {
    const citas = this.getCitas();
    return citas.find(c => c.id === id);
  },

  getCitasPorPaciente(pacienteId) {
    const citas = this.getCitas();
    return citas.filter(c => c.pacienteId === pacienteId);
  },

  getCitasPorMedico(medicoId) {
    const citas = this.getCitas();
    return citas.filter(c => c.medicoId === medicoId);
  },

  getCitasHoy() {
    const hoy = new Date().toISOString().split('T')[0];
    const citas = this.getCitas();
    return citas.filter(c => c.fecha === hoy);
  },

  getCitasPorFecha(fecha) {
    const citas = this.getCitas();
    return citas.filter(c => c.fecha === fecha);
  },

  addCita(cita) {
    const db = this.getDB();
    if (!db) return null;
    
    const nuevoId = db.citas.length > 0 ? Math.max(...db.citas.map(c => c.id)) + 1 : 1;
    
    const nuevaCita = {
      ...cita,
      id: nuevoId,
      fechaCreacion: new Date().toISOString().split('T')[0],
      estado: cita.estado || "Pendiente"
    };
    
    db.citas.push(nuevaCita);
    this.saveDB(db);
    return nuevaCita;
  },

  updateCita(id, datosActualizados) {
    const db = this.getDB();
    if (!db) return null;
    
    const index = db.citas.findIndex(c => c.id === id);
    if (index !== -1) {
      db.citas[index] = { ...db.citas[index], ...datosActualizados };
      this.saveDB(db);
      return db.citas[index];
    }
    return null;
  },

  deleteCita(id) {
    const db = this.getDB();
    if (!db) return false;
    
    const citasFiltradas = db.citas.filter(c => c.id !== id);
    if (citasFiltradas.length === db.citas.length) {
      return false;
    }
    
    db.citas = citasFiltradas;
    this.saveDB(db);
    return true;
  },

  // ========== MÉTODOS PARA NOTAS MÉDICAS ==========
  getNotasMedicas() {
    const db = this.getDB();
    return db ? db.notasMedicas : [];
  },

  getNotasPorPaciente(pacienteId) {
    const notas = this.getNotasMedicas();
    return notas.filter(n => n.pacienteId === pacienteId);
  },

  addNotaMedica(nota) {
    const db = this.getDB();
    if (!db) return null;
    
    const nuevoId = db.notasMedicas.length > 0 ? Math.max(...db.notasMedicas.map(n => n.id)) + 1 : 1;
    
    const nuevaNota = {
      ...nota,
      id: nuevoId,
      fecha: nota.fecha || new Date().toISOString().split('T')[0]
    };
    
    db.notasMedicas.push(nuevaNota);
    this.saveDB(db);
    return nuevaNota;
  },

  // ========== MÉTODOS UTILITARIOS ==========
  buscarPacientePorEmail(email) {
    const pacientes = this.getPacientes();
    return pacientes.find(p => p.email === email);
  },

  buscarPacientePorTelefono(telefono) {
    const pacientes = this.getPacientes();
    return pacientes.find(p => p.telefono === telefono);
  },

  // ========== ESTADÍSTICAS ==========
  getEstadisticas() {
    const pacientes = this.getPacientes();
    const citas = this.getCitas();
    const medicos = this.getMedicos();
    
    const hoy = new Date().toISOString().split('T')[0];
    const citasHoy = this.getCitasHoy();
    const citasPendientes = citas.filter(c => c.estado === 'Pendiente');
    
    // Calcular ingresos aproximados del mes actual
    const ahora = new Date();
    const citasMes = citas.filter(cita => {
      const fechaCita = new Date(cita.fecha);
      return fechaCita.getMonth() === ahora.getMonth() && 
             fechaCita.getFullYear() === ahora.getFullYear();
    });
    const ingresosMes = citasMes.length * 800; // $800 promedio por cita
    
    return {
      totalPacientes: pacientes.length,
      totalCitas: citas.length,
      totalMedicos: medicos.length,
      citasHoy: citasHoy.length,
      citasPendientes: citasPendientes.length,
      ingresosMes,
      tasaOcupacion: citas.length > 0 ? Math.round((citasHoy.length / 20) * 100) : 0 // 20 citas posibles por día
    };
  },

  // ========== BACKUP ==========
  exportBackup() {
    return this.getDB();
  },

  importBackup(data) {
    try {
      localStorage.setItem('cunicatorDB', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error al importar backup:', error);
      return false;
    }
  },

  resetDatabase() {
    localStorage.removeItem('cunicatorDB');
    this.init();
    return true;
  }
};

// Inicializar la base de datos cuando se importa
Database.init();

export default Database;