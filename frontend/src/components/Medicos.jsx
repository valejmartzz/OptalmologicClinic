function Medicos({ medicos }) {
  return (
    <section>
      <h3>Médicos Tratantes</h3>

      <ul>
        {medicos.map((medico, index) => (
          <li key={index}>{medico}</li>
        ))}
      </ul>
    </section>
  );
}

export default Medicos;
