import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    motivoConsulta: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    if (!formData.motivoConsulta.trim()) newErrors.motivoConsulta = 'El motivo de consulta es requerido';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simular envío a API
      setTimeout(() => {
        console.log('Paciente registrado:', formData);
        setIsSubmitting(false);
        
        // Redirigir al perfil
        navigate('/perfil');
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        border: '1px solid #f1f5f9'
      }}>
        {/* Header con gradiente */}
        <div style={{
          background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.5rem'
          }}>
            👁️
          </div>
          <h1 style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: '600',
            letterSpacing: '-0.5px'
          }}>
            Registro de Paciente
          </h1>
          <p style={{
            margin: '0.5rem 0 0',
            opacity: '0.9',
            fontSize: '0.95rem'
          }}>
            Completa el formulario para tu primera consulta
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          {/* Nombre y Apellido */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#334155'
              }}>
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  border: `1px solid ${errors.nombre ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  backgroundColor: '#f8fafc'
                }}
              />
              {errors.nombre && (
                <span style={{
                  color: '#ef4444',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem',
                  display: 'block'
                }}>
                  {errors.nombre}
                </span>
              )}
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#334155'
              }}>
                Apellido
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Pérez"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  border: `1px solid ${errors.apellido ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  backgroundColor: '#f8fafc'
                }}
              />
              {errors.apellido && (
                <span style={{
                  color: '#ef4444',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem',
                  display: 'block'
                }}>
                  {errors.apellido}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan@email.com"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                border: `1px solid ${errors.email ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.2s',
                backgroundColor: '#f8fafc'
              }}
            />
            {errors.email && (
              <span style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                marginTop: '0.25rem',
                display: 'block'
              }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Teléfono */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                border: `1px solid ${errors.telefono ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.2s',
                backgroundColor: '#f8fafc'
              }}
            />
            {errors.telefono && (
              <span style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                marginTop: '0.25rem',
                display: 'block'
              }}>
                {errors.telefono}
              </span>
            )}
          </div>

          {/* Fecha de Nacimiento */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                border: `1px solid ${errors.fechaNacimiento ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                color: '#334155',
                backgroundColor: '#f8fafc'
              }}
            />
            {errors.fechaNacimiento && (
              <span style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                marginTop: '0.25rem',
                display: 'block'
              }}>
                {errors.fechaNacimiento}
              </span>
            )}
          </div>

          {/* Motivo de Consulta */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              Motivo de Consulta
            </label>
            <textarea
              name="motivoConsulta"
              value={formData.motivoConsulta}
              onChange={handleChange}
              rows="3"
              placeholder="Describa el motivo de su consulta..."
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                border: `1px solid ${errors.motivoConsulta ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'inherit',
                backgroundColor: '#f8fafc',
                minHeight: '80px'
              }}
            />
            {errors.motivoConsulta && (
              <span style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                marginTop: '0.25rem',
                display: 'block'
              }}>
                {errors.motivoConsulta}
              </span>
            )}
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              position: 'relative',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {isSubmitting ? (
              <>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                {' '}Registrando...
              </>
            ) : (
              'Registrarse y Ver Perfil'
            )}
          </button>

          {/* Volver al inicio */}
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: 'transparent',
              color: '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              marginTop: '1rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            ← Volver al Inicio
          </button>
        </form>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 2rem',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.8rem',
            color: '#64748b'
          }}>
            Al registrarte aceptas nuestros{' '}
            <span style={{ color: '#3498db', cursor: 'pointer' }}>Términos y Condiciones</span>
          </p>
          <p style={{
            margin: '0.5rem 0 0',
            fontSize: '0.75rem',
            color: '#94a3b8'
          }}>
            Visión Clara © 2024 • Tu salud visual es nuestra prioridad
          </p>
        </div>
      </div>

      {/* Estilos CSS para animaciones */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: #3498db !important;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
      `}</style>
    </div>
  );
}

export default Registro;