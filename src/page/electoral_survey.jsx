import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ElectoralSurvey() {
  const navigate = useNavigate();

  const candidates = [
    { name: "Manfred Reyes Villa", img: "https://via.placeholder.com/40" },
    { name: "Chi Hyun Chung", img: "https://via.placeholder.com/40" },
    { name: "Samuel Doria Medina", img: "https://via.placeholder.com/40" },
    { name: "Jorge Tuto Quiroga", img: "https://via.placeholder.com/40" },
    { name: "Carlos Mesa", img: "https://via.placeholder.com/40" },
    { name: "Luis Arce Catacora", img: "https://via.placeholder.com/40" },
    { name: "Eva Copa", img: "https://via.placeholder.com/40" },
    { name: "Otros", img: "https://via.placeholder.com/40" },
    { name: "No Sabe/No Responde", img: "https://via.placeholder.com/40" },
  ];

  const cities = [
    "La Paz", "El Alto", "Cochabamba", "Oruro", "Potosí", 
    "Chuquisaca", "Tarija", "Beni", "Pando", "Santa Cruz"
  ];

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voterData, setVoterData] = useState({
    ci: "",
    age: "",
    department: "",
  });

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

      if (response.ok) {
        alert("✅ Votación registrada con éxito.");
        navigate("/resultado", { state: voteData });
      } else if (response.status === 409) {
        alert("⚠️ Este C.I. ya ha votado.");
      } else {
        alert("❌ Error al registrar el voto.");
      }
    } catch (error) {
      alert("❌ Error de conexión.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-2xl font-bold">
        Elecciones Generales Bolivia 2025
      </h1>
      <p className="text-center mt-2">
        Esta encuesta busca reflejar la opinión ciudadana de forma anónima y sin afiliación política.
      </p>

      <div className="alert alert-info mt-4">
        <h5>Sobre esta encuesta</h5>
        <p>
          Esta es una simulación de encuesta pública sin fines partidarios ni comerciales. 
          Los datos son recolectados con fines estadísticos y de análisis.
        </p>
        <p>
          No almacenamos datos personales identificables ni los usamos para publicidad.
        </p>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 mt-3 d-flex flex-column align-items-center">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Seleccione un candidato
          </h2>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr
                  key={index}
                  className={selectedCandidate === candidate ? "table-primary" : ""}
                >
                  <td className="text-center">{candidate.name}</td>
                  <td className="text-center">
                    <button
                      className={`btn btn-${selectedCandidate === candidate ? "primary" : "secondary"}`}
                      onClick={() => setSelectedCandidate(candidate)}
                      aria-label={`Seleccionar a ${candidate.name}`}
                    >
                      {selectedCandidate === candidate ? "Seleccionado" : "Seleccionar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6 mt-3 d-flex flex-column align-items-center">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Datos del Votante
          </h2>
          <div className="mb-3 w-75">
            <label htmlFor="ci" className="form-label">C.I.</label>
            <input
              type="text"
              id="ci"
              className="form-control text-center"
              value={voterData.ci}
              onChange={(e) => setVoterData({ ...voterData, ci: e.target.value })}
              placeholder="Número de Cédula"
            />
          </div>

          <div className="mb-3 w-75">
            <label htmlFor="age" className="form-label">Edad</label>
            <input
              type="number"
              id="age"
              className="form-control text-center"
              value={voterData.age}
              onChange={(e) => setVoterData({ ...voterData, age: e.target.value })}
              placeholder="Edad"
            />
          </div>

          <div className="w-75">
            <label htmlFor="department" className="form-label">Departamento</label>
            <select
              id="department"
              className="form-control text-center"
              value={voterData.department}
              onChange={(e) => setVoterData({ ...voterData, department: e.target.value })}
            >
              <option value="">Selecciona una opción</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button className="btn btn-success mt-4" onClick={handleVote}>
              Votar y Guardar
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-5 text-center">
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Política de Privacidad
        </a>
      </footer>
    </div>
  );
}
