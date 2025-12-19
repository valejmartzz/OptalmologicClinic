function Historial({ historial }) {
  return (
    <section>
      <h3>Historia Clínica</h3>

      <ul>
        {historial.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default Historial;
