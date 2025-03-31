import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ElectoralSurvey() {
  const navigate = useNavigate(); // 👈 Para redirigir a la página de resultados

  const candidates = [
    { name: "Candidato A", img: "https://via.placeholder.com/40" },
    { name: "Candidato B", img: "https://via.placeholder.com/40" },
    { name: "Candidato C", img: "https://via.placeholder.com/40" },
  ];

  const cities = ["La Paz", "El Alto", "Cochabamba", "Oruro", "Potosí", "Chuquisaca", "Tarija", "Beni", "Pando", "Santa Cruz"];

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voterData, setVoterData] = useState({ ci: "", age: "", department: "" });

  const handleVote = async () => {
    if (!selectedCandidate || !voterData.ci || !voterData.age || !voterData.department) {
      alert("Por favor, complete todos los campos antes de votar.");
      return;
    }

    const voteData = { candidato: selectedCandidate.name, votante: voterData };

    try {
      const response = await fetch("http://localhost:5000/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Votación registrada con éxito.");
        navigate("/resultado", { state: voteData }); // 👈 Redirige con los datos del voto
      } else if (response.status === 409) {
        alert("⚠️ Error: Este C.I. ya ha votado.");
      } else {
        alert("❌ Error al registrar el voto. Inténtelo de nuevo.");
      }
    } catch (error) {
      alert("❌ Error de conexión con el servidor.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-2xl font-bold">Elecciones Generales Bolivia 2025</h1>
      <h4 className="text-center mt-4 text-lg">Si hoy fueran las elecciones, ¿por quién votaría?</h4>

      <div className="row mt-6">
        {/* Selección de Candidato */}
        <div className="col-md-6 mt-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Seleccione un candidato</h2>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr><th>Imagen</th><th>Nombre</th><th>Seleccionar</th></tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <img src={candidate.img} alt={candidate.name} className="w-8 h-8 rounded-circle" />
                  </td>
                  <td className="text-center">{candidate.name}</td>
                  <td className="text-center">
                    <button
                      className={`btn btn-${selectedCandidate === candidate ? "primary" : "secondary"}`}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      {selectedCandidate === candidate ? "Seleccionado" : "Seleccionar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulario del Votante */}
        <div className="col-md-6 mt-4">
          <h2 className="text-xl font-semibold mb-2">Datos del Votante</h2>
          <div className="mb-3">
            <label htmlFor="ci" className="form-label">C.I.</label>
            <input
              type="text" id="ci" placeholder="C.I"
              value={voterData.ci}
              onChange={(e) => setVoterData({ ...voterData, ci: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Edad</label>
            <input
              type="number" id="age" placeholder="Edad"
              value={voterData.age}
              onChange={(e) => setVoterData({ ...voterData, age: e.target.value })}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="department">Departamento:</label>
            <select
              id="department" className="form-control"
              value={voterData.department}
              onChange={(e) => setVoterData({ ...voterData, department: e.target.value })}
            >
              <option value="">Selecciona una opción</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Botón de Votación */}
      <div className="text-center">
        <button type="button" className="btn btn-success mt-4" onClick={handleVote}>
          Votar y Guardar
        </button>
      </div>
    </div>
  );
}
