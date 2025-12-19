import React from 'react';
import { useNavigate } from 'react-router-dom';

function Examenes() {
  const navigate = useNavigate();

  const examenesDisponibles = [
    {
      nombre: "Campimetría Computarizada",
      descripcion: "Evaluación del campo visual para detección de glaucoma",
      duracion: "30 min",
      tecnologia: "Pantalla LED de alta precisión"
    },
    {
      nombre: "Tomografía de Coherencia Óptica (OCT)",
      descripcion: "Imágenes en 3D de la retina y nervio óptico",
      duracion: "20 min",
      tecnologia: "Tomógrafo de última generación"
    },
    {
      nombre: "Topografía Corneal",
      descripcion: "Mapa detallado de la superficie corneal",
      duracion: "15 min",
      tecnologia: "Topógrafo computarizado"
    },
    {
      nombre: "Retinografía Digital",
      descripcion: "Fotografías de alta resolución de la retina",
      duracion: "15 min",
      tecnologia: "Cámara digital especializada"
    },
    {
      nombre: "Paquimetría Ultrasónica",
      descripcion: "Medición del grosor corneal",
      duracion: "10 min",
      tecnologia: "Ultrasonido de alta frecuencia"
    },
    {
      nombre: "Biometría Ocular",
      descripcion: "Medición precisa para cirugía de cataratas",
      duracion: "20 min",
      tecnologia: "Biometro láser"
    },
    {
      nombre: "Ecografía Ocular",
      descripcion: "Estudio de estructuras internas del ojo",
      duracion: "25 min",
      tecnologia: "Ecógrafo de alta resolución"
    },
    {
      nombre: "Angiografía con Fluoresceína",
      descripcion: "Evaluación de la circulación retiniana",
      duracion: "45 min",
      tecnologia: "Cámara especial con filtros"
    }
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

      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#2c3e50" }}>
        Exámenes Especializados
      </h1>
      
      <p style={{ 
        textAlign: "center", 
        fontSize: "1.1rem", 
        marginBottom: "3rem",
        color: "#555"
      }}>
        Diagnósticos precisos con tecnología avanzada de última generación
      </p>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
        marginBottom: "3rem"
      }}>
        {examenesDisponibles.map((examen, index) => (
          <div 
            key={index}
            style={{
              padding: "1.5rem",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              backgroundColor: "white",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h3 style={{ color: "#2980b9", marginBottom: "0.8rem" }}>
              🔬 {examen.nombre}
            </h3>
            <p style={{ color: "#555", marginBottom: "1rem" }}>
              {examen.descripcion}
            </p>
            
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "0.8rem",
              borderRadius: "8px",
              marginBottom: "1rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#7f8c8d" }}>
                  ⏱️ <strong>{examen.duracion}</strong>
                </span>
                <span style={{ color: "#27ae60", fontWeight: "bold" }}>
                  💻 {examen.tecnologia}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate("/registro")}
              style={{
                width: "100%",
                padding: "0.7rem",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem"
              }}
            >
              Agendar este examen
            </button>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div style={{
        backgroundColor: "#e8f4fc",
        padding: "2rem",
        borderRadius: "12px",
        borderLeft: "5px solid #3498db"
      }}>
        <h3 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
          ℹ️ Información importante sobre los exámenes
        </h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}>
          <div>
            <h4>📋 Preparación</h4>
            <ul style={{ paddingLeft: "1.2rem", color: "#555" }}>
              <li>Traer estudios previos</li>
              <li>No usar lentes de contacto (en algunos casos)</li>
              <li>Llegar 15 minutos antes</li>
            </ul>
          </div>
          
          <div>
            <h4>💰 Costos</h4>
            <p style={{ color: "#555" }}>
              Los costos varían según el examen. Consulta por paquetes y descuentos.
            </p>
          </div>
          
          <div>
            <h4>🏥 Resultados</h4>
            <p style={{ color: "#555" }}>
              Resultados inmediatos en la mayoría de exámenes. Informe detallado incluido.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Examenes;