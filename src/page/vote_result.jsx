import { useLocation } from "react-router-dom";

export default function VoteResult() {
  const location = useLocation();
  const voteData = location.state;

  if (!voteData) {
    return <h2 className="text-center mt-5">No hay datos de votación.</h2>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-2xl font-bold">Tu Voto Registrado</h1>
      <div className="card p-4 mt-4">
        <h2><strong>Candidato Seleccionado:</strong> {voteData.candidato}</h2>
        <h3><strong>C.I.:</strong> {voteData.votante.ci}</h3>
        <h3><strong>Edad:</strong> {voteData.votante.age}</h3>
        <h3><strong>Departamento:</strong> {voteData.votante.department}</h3>
      </div>
    </div>
  );
}
