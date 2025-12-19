import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* HERO SECTION - Rediseñada */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Elementos decorativos */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)'
        }}></div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              👁️
            </div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              letterSpacing: '-0.5px'
            }}>
              Optialmologic Clinic
            </h1>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '300',
              marginBottom: '2rem',
              opacity: '0.9'
            }}>
              Clínica Oftalmológica Especializada
            </h2>
          </div>

          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            marginBottom: '3rem',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: '0.95'
          }}>
            Nos apasiona cuidar tu salud visual con calidad y profesionalismo, 
            combinando tecnología de vanguardia con un trato cercano y humano. 
            Tu bienestar visual es nuestra prioridad.
          </p>

          {/* Botón Principal */}
          <button 
            onClick={() => navigate("/consultas")}
            style={{
              padding: '1.2rem 3rem',
              backgroundColor: 'white',
              color: '#2563eb',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              marginBottom: '2rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            }}
          >
            Agendar cita
          </button>

          {/* Accesos Especiales */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => navigate("/login-paciente")}
              style={{
                padding: '0.8rem 1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <span>👤</span>
              Acceso Paciente
            </button>

            <button 
              onClick={() => navigate("/login-medico")}
              style={{
                padding: '0.8rem 1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <span>👨‍⚕️</span>
              Acceso Médico
            </button>

            <button 
              onClick={() => navigate("/login-admin")}
              style={{
                padding: '0.8rem 1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <span>🔧</span>
              Acceso Administrativo
            </button>
          </div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Nuestros Servicios
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Ofrecemos una amplia gama de servicios oftalmológicos con la más alta tecnología
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {/* Consulta Oftalmológica */}
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }}
            onClick={() => navigate("/consultas")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.backgroundColor = '#f0f9ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#dbeafe',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                color: '#2563eb'
              }}>
                👁️
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Consulta Oftalmológica
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Evaluación completa de la salud visual con especialistas certificados.
              </p>
              <span style={{
                color: '#2563eb',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                Ver especialidades →
              </span>
            </div>

            {/* Exámenes Especializados */}
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }}
            onClick={() => navigate("/examenes")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.backgroundColor = '#f0f9ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#fef3c7',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                color: '#d97706'
              }}>
                🧪
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Exámenes Especializados
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Diagnósticos precisos con tecnología de última generación.
              </p>
              <span style={{
                color: '#2563eb',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                Conocer exámenes →
              </span>
            </div>

            {/* Optometría */}
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              border: '1px solid #f1f5f9',
              cursor: 'pointer'
            }}
            onClick={() => navigate("/optometria")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.backgroundColor = '#f0f9ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#f3e8ff',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                color: '#7c3aed'
              }}>
                👓
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Optometría
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Corrección visual personalizada para cada paciente.
              </p>
              <span style={{
                color: '#2563eb',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                Ver servicios →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: '#f1f5f9'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            textAlign: "center", 
            marginBottom: "2.5rem",
            color: "#1e293b",
            fontSize: "2.2rem",
            fontWeight: "700",
            position: "relative"
          }}>
            <span style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "-10px",
              width: "80px",
              height: "4px",
              backgroundColor: "#2563eb",
              borderRadius: "2px"
            }}></span>
            Sobre Nosotros
          </h2>

          <div style={{ lineHeight: "1.8" }}>
            <p style={{ 
              fontSize: "1.1rem", 
              marginBottom: "1.5rem",
              color: "#334155"
            }}>
              En <strong style={{ color: "#2563eb" }}>Optialmologic Clinic</strong> nos dedicamos apasionadamente al cuidado integral de la salud visual desde hace más de <strong>25 años</strong>. Fundada por un equipo de oftalmólogos visionarios, nuestra clínica ha crecido hasta convertirse en un referente regional en el diagnóstico, tratamiento y prevención de enfermedades oculares.
            </p>

            <p style={{ 
              fontSize: "1.1rem", 
              marginBottom: "1.5rem",
              color: "#334155"
            }}>
              Nuestra misión va más allá de corredir problemas visuales; nos comprometemos a <strong>mejorar la calidad de vida</strong> de cada paciente a través de una atención personalizada, tecnología de vanguardia y un enfoque humano que comprende las necesidades individuales de niños, adultos y personas mayores.
            </p>

            <div style={{ 
              margin: "2rem 0",
              padding: "1.5rem",
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              borderLeft: "4px solid #10b981"
            }}>
              <h3 style={{ 
                color: "#059669", 
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                💡 Nuestro Compromiso
              </h3>
              <ul style={{ 
                paddingLeft: "1.5rem",
                color: "#475569"
              }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Innovación constante:</strong> Invertimos regularmente en equipos de última generación.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Educación continua:</strong> Nuestro equipo médico se mantiene actualizado constantemente.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Atención integral:</strong> Cubrimos todas las especialidades oftalmológicas.
                </li>
                <li>
                  <strong>Accesibilidad:</strong> Ofrecemos planes de pago flexibles.
                </li>
              </ul>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              margin: "2.5rem 0"
            }}>
              <div style={{ 
                textAlign: "center",
                padding: "1.5rem",
                backgroundColor: "#eff6ff",
                borderRadius: "12px"
              }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: "0.5rem"
                }}>25+</div>
                <div style={{ color: "#475569", fontWeight: "500" }}>Años de experiencia</div>
              </div>

              <div style={{ 
                textAlign: "center",
                padding: "1.5rem",
                backgroundColor: "#f0f9ff",
                borderRadius: "12px"
              }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: "bold",
                  color: "#059669",
                  marginBottom: "0.5rem"
                }}>12</div>
                <div style={{ color: "#475569", fontWeight: "500" }}>Especialistas certificados</div>
              </div>

              <div style={{ 
                textAlign: "center",
                padding: "1.5rem",
                backgroundColor: "#fef3c7",
                borderRadius: "12px"
              }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: "bold",
                  color: "#d97706",
                  marginBottom: "0.5rem"
                }}>15,000+</div>
                <div style={{ color: "#475569", fontWeight: "500" }}>Pacientes atendidos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.8rem'
            }}>
              👁️
            </div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Optialmologic Clinic
            </h3>
            <p style={{
              color: '#cbd5e1',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Clínica Oftalmológica Especializada - Tu salud visual es nuestra prioridad
            </p>
          </div>

          {/* MENÚ */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <span 
              style={{ 
                cursor: 'pointer', 
                color: '#cbd5e1',
                transition: 'color 0.3s ease'
              }} 
              onClick={() => navigate("/consultas")}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
            >
              Consultas
            </span>
            <span 
              style={{ 
                cursor: 'pointer', 
                color: '#cbd5e1',
                transition: 'color 0.3s ease'
              }} 
              onClick={() => navigate("/examenes")}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
            >
              Exámenes
            </span>
            <span 
              style={{ 
                cursor: 'pointer', 
                color: '#cbd5e1',
                transition: 'color 0.3s ease'
              }} 
              onClick={() => navigate("/optometria")}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
            >
              Optometría
            </span>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            color: '#94a3b8',
            fontSize: '0.9rem'
          }}>
            <p style={{ marginBottom: '0.5rem' }}>
              © {new Date().getFullYear()} Optialmologic Clinic. Todos los derechos reservados.
            </p>
            <p style={{ fontSize: '0.8rem', opacity: '0.7' }}>
              Av. Oftalmológica #123, Ciudad • Tel: (555) 123-4567 • Email: contacto@visionclara.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;