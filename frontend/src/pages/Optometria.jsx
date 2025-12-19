import React from 'react';
import { useNavigate } from 'react-router-dom';

function Optometria() {
  const navigate = useNavigate();

  const serviciosOptometria = [
    {
      nombre: "Examen de Refracción",
      descripcion: "Determinación exacta de graduación para lentes",
      incluye: ["Agudeza visual", "Prueba de lentes", "Medición de astigmatismo"]
    },
    {
      nombre: "Adaptación de Lentes de Contacto",
      descripcion: "Selección y adaptación profesional de lentes de contacto",
      incluye: ["Evaluación corneal", "Prueba de lentes", "Instrucción de uso"]
    },
    {
      nombre: "Terapia Visual",
      descripcion: "Ejercicios para mejorar habilidades visuales",
      incluye: ["Evaluación inicial", "Sesiones personalizadas", "Seguimiento"]
    },
    {
      nombre: "Baja Visión",
      descripcion: "Ayudas ópticas para pacientes con visión reducida",
      incluye: ["Evaluación", "Prueba de ayudas", "Entrenamiento"]
    },
    {
      nombre: "Control de Miopía",
      descripcion: "Tratamientos para reducir progresión de miopía",
      incluye: ["Evaluación", "Lentes especiales", "Seguimiento"]
    },
    {
      nombre: "Examen Visual Infantil",
      descripcion: "Evaluación especializada para niños",
      incluye: ["Pruebas infantiles", "Detección temprana", "Recomendaciones"]
    }
  ];

  const tiposLentes = [
    "Monofocales",
    "Bifocales",
    "Progresivos",
    "Fotocromáticos",
    "Antirreflejantes",
    "Blue Light Protection"
  ];

  return (
    <main style={{ padding: "3rem", maxWidth: "1200px", margin: "0 auto" }}>
      <button 
        onClick={() => navigate("/")}
        style={{
          marginBottom: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f0f0f0",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ← Volver a Inicio
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#2c3e50" }}>
        👓 Optometría
      </h1>
      
      <p style={{ 
        textAlign: "center", 
        fontSize: "1.2rem", 
        marginBottom: "3rem",
        color: "#7f8c8d"
      }}>
        Corrección visual personalizada para cada paciente
      </p>
      
      {/* Servicios de Optometría */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ color: "#34495e", marginBottom: "2rem", borderBottom: "3px solid #3498db", paddingBottom: "0.5rem" }}>
          Nuestros Servicios de Optometría
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem"
        }}>
          {serviciosOptometria.map((servicio, index) => (
            <div 
              key={index}
              style={{
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "white",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ color: "#2980b9", marginBottom: "0.8rem" }}>
                {servicio.nombre}
              </h3>
              <p style={{ color: "#555", marginBottom: "1rem" }}>
                {servicio.descripcion}
              </p>
              
              <h4 style={{ color: "#2c3e50", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                Incluye:
              </h4>
              <ul style={{ 
                paddingLeft: "1.2rem", 
                color: "#666",
                marginBottom: "1.5rem"
              }}>
                {servicio.incluye.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              
              <button 
                onClick={() => navigate("/registro")}
                style={{
                  width: "100%",
                  padding: "0.7rem",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Agendar cita de optometría
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Tipos de Lentes */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ color: "#34495e", marginBottom: "1.5rem" }}>
          🕶️ Tipos de Lentes Disponibles
        </h2>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          {tiposLentes.map((lente, index) => (
            <span 
              key={index}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ecf0f1",
                borderRadius: "20px",
                color: "#2c3e50",
                fontWeight: "500"
              }}
            >
              {lente}
            </span>
          ))}
        </div>
        
        <p style={{ color: "#555", fontStyle: "italic" }}>
          Trabajamos con las mejores marcas: Essilor, Zeiss, Hoya, Transitions
        </p>
      </section>

      {/* Información Adicional */}
      <div style={{
        backgroundColor: "#fff8e1",
        padding: "2rem",
        borderRadius: "10px",
        border: "1px solid #ffd54f"
      }}>
        <h3 style={{ color: "#f39c12", marginBottom: "1rem" }}>
          ⭐ ¿Por qué elegir nuestro servicio de Optometría?
        </h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}>
          <div>
            <h4>🎯 Personalización</h4>
            <p style={{ color: "#555" }}>
              Cada tratamiento es diseñado específicamente para tus necesidades visuales.
            </p>
          </div>
          
          <div>
            <h4>🔬 Tecnología Avanzada</h4>
            <p style={{ color: "#555" }}>
              Equipos de última generación para mediciones precisas.
            </p>
          </div>
          
          <div>
            <h4>👨‍⚕️ Expertos Certificados</h4>
            <p style={{ color: "#555" }}>
              Optometristas con más de 10 años de experiencia.
            </p>
          </div>
          
          <div>
            <h4>📅 Seguimiento Continuo</h4>
            <p style={{ color: "#555" }}>
              Acompañamiento durante todo el proceso de adaptación.
            </p>
          </div>
        </div>
      </div>

      {/* Llamada a la acción */}
      <div style={{
        textAlign: "center",
        marginTop: "3rem",
        padding: "2rem",
        backgroundColor: "#2c3e50",
        color: "white",
        borderRadius: "10px"
      }}>
        <h3>¿Listo para mejorar tu visión?</h3>
        <p style={{ marginBottom: "1.5rem" }}>
          Agenda una cita para una evaluación completa y recibe asesoría personalizada.
        </p>
        <button 
          onClick={() => navigate("/registro")}
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: "bold"
          }}
        >
          Agendar Evaluación Optométrica
        </button>
      </div>
    </main>
  );
}

export default Optometria;