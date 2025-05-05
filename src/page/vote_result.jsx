import { useLocation, useNavigate} from "react-router-dom";

export default function VoteResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { candidato, votante } = location.state || {};

  if (!candidato || !votante) {
    return (
      <div className="container mt-4">
        <h2 className="text-danger text-center">⚠️ No se encontró información del voto.</h2>
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Volver a votar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🗳️ Resultado de tu Votación</h1>

      <div className="alert alert-success">
        <h5>Tu voto ha sido registrado correctamente.</h5>
        <p>Gracias por participar en esta simulación de encuesta electoral.</p>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Resumen del Votante</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Candidato elegido: <strong>{candidato}</strong></li>
            <li className="list-group-item">C.I.: {votante.ci}</li>
            <li className="list-group-item">Edad: {votante.age}</li>
            <li className="list-group-item">Departamento: {votante.department}</li>
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h4>¿Por qué hacemos esta encuesta?</h4>
        <p>
          Esta simulación de votación busca comprender las tendencias de opinión ciudadana en Bolivia
          antes de las elecciones 2025. Los resultados nos ayudan a identificar regiones con mayor participación
          y evaluar el interés público por distintos candidatos.
        </p>
        <p>
          No está afiliada a ningún partido ni institución. No se recopilan datos personales sensibles con fines comerciales.
        </p>
      </div>

      <div className="mb-4">
        <h4>Análisis Simulado</h4>
        <p>
          Según las respuestas recolectadas, el candidato <strong>{candidato}</strong> ha tenido un apoyo creciente en el departamento de <strong>{votante.department}</strong>.
          Esto puede deberse a factores como visibilidad en medios, propuestas políticas o afinidad regional.
        </p>
      </div>

      <div className="text-center">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
