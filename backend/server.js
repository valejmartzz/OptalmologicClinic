const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de seguridad
app.use(helmet());

// CORS configurado para desarrollo
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logger para desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== MIDDLEWARE ESPECIAL =====

// Ignorar favicon.ico para evitar errores 404
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No Content
});

// ===== RUTAS PRINCIPALES =====

// Ruta raíz - Información de la API
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bienvenido a la API de Clínica Oftalmológica Visión Clara',
    version: '1.0.0',
    documentation: 'Disponible en /api-docs (próximamente)',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
        profile: 'GET /api/auth/profile'
      },
      appointments: {
        create: 'POST /api/appointments',
        list: 'GET /api/appointments',
        patient: 'GET /api/appointments/patient',
        doctor: 'GET /api/appointments/doctor'
      },
      doctors: 'GET /api/doctors',
      patients: 'GET /api/patients'
    },
    timestamp: new Date().toISOString()
  });
});

// Ruta de salud del sistema
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    service: 'clinic-ophthalmology-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ===== RUTAS DE API =====

// Auth routes
app.post('/api/auth/login', (req, res) => {
  // Simulación de login
  const { email, password } = req.body;
  
  // Credenciales de prueba
  const testUsers = {
    'drlopez@visionclara.com': { password: 'password123', type: 'doctor', name: 'Dr. Carlos López' },
    'paciente@visionclara.com': { password: 'password123', type: 'patient', name: 'Juan Pérez' },
    'admin@visionclara.com': { password: 'admin123', type: 'admin', name: 'Administrador' }
  };
  
  if (testUsers[email] && testUsers[email].password === password) {
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        email,
        name: testUsers[email].name,
        type: testUsers[email].type
      },
      token: 'jwt_simulado_' + Date.now()
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Credenciales incorrectas'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, birthDate } = req.body;
  
  res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente',
    user: {
      id: Date.now(),
      name,
      email,
      phone,
      birthDate,
      type: 'patient'
    }
  });
});

// Appointments routes
let appointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Juan Pérez',
    doctorId: 1,
    doctorName: 'Dr. Carlos López',
    date: '2024-01-15',
    time: '10:00',
    reason: 'Examen de rutina',
    status: 'confirmed',
    notes: 'Paciente con historial de miopía'
  }
];

app.get('/api/appointments', (req, res) => {
  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

app.post('/api/appointments', (req, res) => {
  const newAppointment = {
    id: appointments.length + 1,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  appointments.push(newAppointment);
  
  res.status(201).json({
    success: true,
    message: 'Cita creada exitosamente',
    data: newAppointment
  });
});

// Doctors routes
app.get('/api/doctors', (req, res) => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Carlos López',
      specialty: 'Retina y Vítreo',
      experience: '20 años',
      phone: '555-5678',
      email: 'drlopez@visionclara.com',
      schedule: 'Lunes a Viernes, 9:00 AM - 6:00 PM',
      available: true
    },
    {
      id: 2,
      name: 'Dra. Ana García',
      specialty: 'Córnea y Cirugía Refractiva',
      experience: '15 años',
      phone: '555-9012',
      email: 'dragarcia@visionclara.com',
      schedule: 'Lunes a Sábado, 8:00 AM - 4:00 PM',
      available: true
    },
    {
      id: 3,
      name: 'Dr. Miguel Torres',
      specialty: 'Glaucoma',
      experience: '18 años',
      phone: '555-3456',
      email: 'drtorres@visionclara.com',
      schedule: 'Martes a Viernes, 10:00 AM - 7:00 PM',
      available: true
    }
  ];
  
  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors
  });
});

// ===== MANEJO DE ERRORES =====

// 404 - Ruta no encontrada (excepto favicon.ico que ya manejamos)
app.use((req, res, next) => {
  // No mostrar error para favicon.ico
  if (req.originalUrl === '/favicon.ico') {
    return next();
  }
  
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Manejo centralizado de errores
app.use((error, req, res, next) => {
  // No mostrar error para favicon.ico
  if (req.originalUrl === '/favicon.ico') {
    return res.status(204).end();
  }
  
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';
  
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      message: error.message,
      path: req.originalUrl,
      method: req.method
    });
  }
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      statusCode: statusCode,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    }
  });
});

// ===== INICIAR SERVIDOR =====

const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║    CLÍNICA OFTALMOLÓGICA - BACKEND API       ║
╠══════════════════════════════════════════════╣
║ 🚀 Servidor: http://localhost:${PORT}        ║
║ 📡 Puerto: ${PORT}                           ║
║ 🌍 Entorno: ${process.env.NODE_ENV || 'development'} ║
║ 🕐 Iniciado: ${new Date().toLocaleTimeString()}      ║
╚══════════════════════════════════════════════╝

📋 Endpoints disponibles:
   • GET  /                   - Información de la API
   • GET  /health             - Estado del servidor
   • POST /api/auth/login     - Iniciar sesión
   • POST /api/auth/register  - Registrarse
   • GET  /api/doctors        - Lista de médicos
   • GET  /api/appointments   - Ver citas
   • POST /api/appointments   - Crear cita

👨‍⚕️  Credenciales de prueba:
   • Médico:    drlopez@visionclara.com / password123
   • Paciente:  paciente@visionclara.com / password123
   • Admin:     admin@visionclara.com / admin123
   
🔧 Para probar endpoints:
   curl http://localhost:${PORT}/api/doctors
`);
});