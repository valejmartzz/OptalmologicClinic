import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginMedico() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Credenciales de ejemplo (en producción esto vendría de una API)
    const medicosValidos = [
      { email: 'medico@visionclara.com', password: 'medico123', nombre: 'Dr. Carlos Méndez' },
      { email: 'ana@visionclara.com', password: 'ana123', nombre: 'Dra. Ana Rodríguez' },
      { email: 'luis@visionclara.com', password: 'luis123', nombre: 'Dr. Luis Fernández' }
    ];

    // Simular validación
    setTimeout(() => {
      const medico = medicosValidos.find(
        m => m.email === credentials.email && m.password === credentials.password
      );

      if (medico) {
        // Guardar sesión en localStorage
        localStorage.setItem('medicoLogeado', JSON.stringify({
          email: medico.email,
          nombre: medico.nombre,
          tipo: 'medico'
        }));
        
        // Redirigir al panel médico
        navigate('/medico');
      } else {
        setError('Credenciales inválidas. Intente con: medico@visionclara.com / medico123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f9ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2.5rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        {/* Icono médico */}
        <div style={{
          width: '70px',
          height: '70px',
          backgroundColor: '#2ecc71',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem',
          color: 'white'
        }}>
          👨‍⚕️
        </div>

        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '0.5rem'
        }}>
          Acceso Médico
        </h1>
        
        <p style={{
          color: '#7f8c8d',
          marginBottom: '2rem',
          fontSize: '0.95rem'
        }}>
          Ingrese sus credenciales para acceder al panel médico
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#2c3e50'
            }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="medico@visionclara.com"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '1rem',
                backgroundColor: '#f8fafc'
              }}
              required
            />
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#2c3e50'
            }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '1rem',
                backgroundColor: '#f8fafc'
              }}
              required
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div style={{
              backgroundColor: '#fee',
              color: '#c0392b',
              padding: '0.8rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              textAlign: 'left'
            }}>
              {error}
            </div>
          )}

          {/* Botón de login */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: loading ? '#95a5a6' : '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>

          {/* Credenciales de ejemplo */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#7f8c8d',
            textAlign: 'left',
            marginBottom: '1.5rem'
          }}>
            <strong>Demo:</strong><br/>
            Email: medico@visionclara.com<br/>
            Password: medico123
          </div>
        </form>

        {/* Volver al inicio */}
        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '0.8rem',
            backgroundColor: 'transparent',
            color: '#7f8c8d',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ← Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default LoginMedico;