import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotaMedica() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [notaData, setNotaData] = useState({
    pacienteId: '',
    fecha: new Date().toISOString().split('T')[0],
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
    proximaCita: '',
    medicamentos: ['']
  });

  useEffect(() => {
    const medicoLogeado = JSON.parse(localStorage.getItem('medicoLogeado'));
    if (!medicoLogeado) {
      navigate('/login-medico');
      return;
    }

    setPacientes([
      { id: 1, nombre: "Ana García" },
      { id: 2, nombre: "Carlos Rodríguez" },
      { id: 3, nombre: "María López" }
    ]);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicamentoChange = (index, value) => {
    const nuevosMedicamentos = [...notaData.medicamentos];
    nuevosMedicamentos[index] = value;
    setNotaData(prev => ({
      ...prev,
      medicamentos: nuevosMedicamentos
    }));
  };

  const addMedicamento = () => {
    setNotaData(prev => ({
      ...prev,
      medicamentos: [...prev.medicamentos, '']
    }));
  };

  const removeMedicamento = (index) => {
    if (notaData.medicamentos.length > 1) {
      const nuevosMedicamentos = notaData.medicamentos.filter((_, i) => i !== index);
      setNotaData(prev => ({
        ...prev,
        medicamentos: nuevosMedicamentos
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const pacienteSeleccionado = pacientes.find(p => p.id === parseInt(notaData.pacienteId));
    
    // Filtrar medicamentos vacíos
    const medicamentosFiltrados = notaData.medicamentos.filter(m => m.trim() !== '');
    
    const notaCompleta = {
      ...notaData,
      medicamentos: medicamentosFiltrados,
      fechaCreacion: new Date().toISOString(),
      medico: JSON.parse(localStorage.getItem('medicoLogeado')).nombre
    };
    
    console.log('Nota médica guardada:', notaCompleta);
    alert(`Nota médica creada exitosamente para ${pacienteSeleccionado?.nombre}`);
    
    // Limpiar formulario
    setNotaData({
      pacienteId: '',
      fecha: new Date().toISOString().split('T')[0],
      motivo: '',
      diagnostico: '',
      tratamiento: '',
      observaciones: '',
      proximaCita: '',
      medicamentos: ['']
    });
  };

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button 
            onClick={() => navigate('/medico')}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: 'white',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ← Volver al Panel
          </button>
          
          <h1 style={{ color: '#1e293b', margin: 0 }}>📝 Nueva Nota Médica</h1>
          <p style={{ color: '#64748b' }}>Registre la información clínica del paciente</p>
        </div>

        {/* Formulario */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Selección de paciente y fecha */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Paciente *
                </label>
                <select
                  name="pacienteId"
                  value={notaData.pacienteId}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <option value="">-- Seleccionar paciente --</option>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                  Fecha de Consulta *
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={notaData.fecha}
                  onChange={handleInputChange}
                  required
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

            {/* Motivo de consulta */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Motivo de Consulta *
              </label>
              <textarea
                name="motivo"
                value={notaData.motivo}
                onChange={handleInputChange}
                required
                rows="3"
                placeholder="Describa el motivo principal de la consulta..."
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

            {/* Diagnóstico */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Diagnóstico *
              </label>
              <textarea
                name="diagnostico"
                value={notaData.diagnostico}
                onChange={handleInputChange}
                required
                rows="3"
                placeholder="Escriba el diagnóstico..."
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

            {/* Tratamiento */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Tratamiento Indicado
              </label>
              <textarea
                name="tratamiento"
                value={notaData.tratamiento}
                onChange={handleInputChange}
                rows="3"
                placeholder="Describa el tratamiento indicado..."
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

            {/* Medicamentos */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: '#475569', fontWeight: '500' }}>Medicamentos Recetados</label>
                <button
                  type="button"
                  onClick={addMedicamento}
                  style={{
                    padding: '0.3rem 0.8rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  + Agregar Medicamento
                </button>
              </div>
              
              {notaData.medicamentos.map((medicamento, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={medicamento}
                    onChange={(e) => handleMedicamentoChange(index, e.target.value)}
                    placeholder="Ej: Paracetamol 500mg cada 8 horas por 7 días"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc'
                    }}
                  />
                  {notaData.medicamentos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedicamento(index)}
                      style={{
                        padding: '0 0.8rem',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Observaciones */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Observaciones Adicionales
              </label>
              <textarea
                name="observaciones"
                value={notaData.observaciones}
                onChange={handleInputChange}
                rows="3"
                placeholder="Observaciones adicionales, recomendaciones, etc..."
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

            {/* Próxima cita */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>
                Próxima Cita Recomendada
              </label>
              <input
                type="date"
                name="proximaCita"
                value={notaData.proximaCita}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate('/medico')}
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
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                💾 Guardar Nota Médica
              </button>
            </div>
          </form>
        </div>

        {/* Plantillas rápidas */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>⚡ Plantillas Rápidas</h3>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {[
              { nombre: 'Consulta General', diagnostico: 'Estado general estable', tratamiento: 'Reposo y seguimiento' },
              { nombre: 'Gripe Común', diagnostico: 'Infección viral de vías respiratorias', tratamiento: 'Antigripales y reposo' },
              { nombre: 'Control Rutina', diagnostico: 'Estado de salud normal', tratamiento: 'Continuar hábitos saludables' },
              { nombre: 'Lesión Menor', diagnostico: 'Esguince grado I', tratamiento: 'Reposo, hielo, compresión y elevación' }
            ].map((plantilla, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setNotaData(prev => ({
                    ...prev,
                    diagnostico: plantilla.diagnostico,
                    tratamiento: plantilla.tratamiento
                  }));
                }}
                style={{
                  padding: '1rem',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '8px',
                  color: '#0369a1',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {plantilla.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotaMedica;