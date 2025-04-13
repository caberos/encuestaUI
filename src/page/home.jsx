import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-3xl font-bold">Elecciones Generales Bolivia 2025 🗳️🇧🇴</h1>
      <p className="mt-4 text-lg">
        En Agosto de 2025, Bolivia celebrará sus elecciones generales, un evento crucial en el que se elegirá al próximo  
        presidente, vicepresidente y miembros de la Asamblea Legislativa Plurinacional. Estos comicios definirán el rumbo  
        del país en los próximos años.
      </p>

      <div className="mt-4 text-left mx-auto" style={{ maxWidth: "700px" }}>
        <h2 className="text-xl font-semibold">📌 Datos Claves</h2>
        <ul className="list-unstyled mt-2">
          <li><strong>📅 Fecha estimada:</strong> 10 Agosto 2025</li>
          <li><strong>🗳️ Cargos en disputa:</strong> Presidente, Vicepresidente y Asamblea Legislativa</li>
          <li><strong>🏛️ Duración del mandato:</strong> 5 años (2025 - 2030)</li>
          <li><strong>👥 Participación esperada:</strong> Más de 7 millones de ciudadanos</li>
          <li><strong>🔹 Modalidad de votación:</strong> Sufragio universal, obligatorio y presencial</li>
        </ul>
      </div>
      
      <div className="mt-5">
        <Link to="/survey" className="btn btn-primary mx-2">
          Participar en la Encuesta
        </Link>
        <Link to="/results" className="btn btn-secondary mx-2">
          Ver Resultados
        </Link>
      </div>
    </div>
  );
}
