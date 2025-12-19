import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
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

    // Credenciales de ejemplo
    const adminsValidos = [
      { username: 'admin', password: 'admin123', nombre: 'Administrador Principal' },
      { username: 'supervisor', password: 'super123', nombre: 'Supervisor' }
    ];

    // Simular validación
    setTimeout(() => {
      const admin = adminsValidos.find(
        a => a.username === credentials.username && a.password === credentials.password
      );

      if (admin) {
        // Guardar sesión en localStorage
        localStorage.setItem('adminLogeado', JSON.stringify({
          username: admin.username,
          nombre: admin.nombre,
          tipo: 'admin'
        }));
        
        // Redirigir al panel admin
        navigate('/admin');
      } else {
        setError('Credenciales inválidas. Intente con: admin / admin123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f3ff',
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
        {/* Icono admin */}
        <div style={{
          width: '70px',
          height: '70px',
          backgroundColor: '#9b59b6',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem',
          color: 'white'
        }}>
          🔧
        </div>

        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '0.5rem'
        }}>
          Acceso Administrativo
        </h1>
        
        <p style={{
          color: '#7f8c8d',
          marginBottom: '2rem',
          fontSize: '0.95rem'
        }}>
          Ingrese sus credenciales para acceder al panel administrativo
        </p>

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#2c3e50'
            }}>
              Usuario
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="admin"
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
              backgroundColor: loading ? '#95a5a6' : '#9b59b6',
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
            Usuario: admin<br/>
            Password: admin123
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

export default LoginAdmin;