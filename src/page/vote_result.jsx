import { useLocation, useNavigate } from "react-router-dom";

export default function VoteResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const voteData = location.state;

  if (!voteData) {
    return <h2 className="text-center mt-5 text-danger">⚠️ No hay datos de votación registrados.</h2>;
  }

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-3xl font-bold text-success">✅ Tu Voto ha sido Registrado</h1>
      
      <div className="card shadow-lg p-4 mt-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-primary"><strong>Candidato Seleccionado:</strong> {voteData.candidato}</h2>
        <hr />
        <h4><strong>🆔 C.I.:</strong> {voteData.votante.ci}</h4>
        <h4><strong>🎂 Edad:</strong> {voteData.votante.age}</h4>
        <h4><strong>📍 Departamento:</strong> {voteData.votante.department}</h4>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary mx-2" onClick={() => navigate("/")}>🏠 Ir a Inicio</button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate("/survey")}>🗳️ Votar de Nuevo</button>
      </div>
    </div>
  );
}
