function Citas({ citas }) {
  return (
    <section>
      <h3>Mis Citas</h3>

      {citas.map((cita) => (
        <div key={cita.id}>
          <p>{cita.fecha} - {cita.medico}</p>
          <p>Estado: {cita.estado}</p>
          <button>Cancelar</button>
        </div>
      ))}
    </section>
  );
}

export default Citas;
