const pacienteFake = {
  nombre: "María Fernanda López",
  documento: "1023456789",
  email: "maria@email.com",
  telefono: "3001234567",

  citas: [
    {
      id: 1,
      fecha: "2025-01-15",
      hora: "09:00 AM",
      medico: "Dr. Juan Pérez",
      especialidad: "Oftalmología",
      estado: "Programada",
    },
  ],

  historiaClinica: [
    {
      fecha: "2024-12-01",
      diagnostico: "Miopía leve",
      tratamiento: "Uso de gafas",
    },
  ],

  medicosAsignados: [
    {
      nombre: "Dr. Juan Pérez",
      especialidad: "Oftalmología",
    },
  ],
};

export default pacienteFake;
