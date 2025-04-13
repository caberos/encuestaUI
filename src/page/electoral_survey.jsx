import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function ElectoralSurvey() {
  const navigate = useNavigate();

  const candidates = [
    "Manfred Reyes Villa",
    "Chi Hyun Chung",
    "Samuel Doria Medina",
    "Jorge Tuto Quiroga",
    "Carlos Mesa",
    "Luis Arce Catacora",
    "Eva Copa",
    "Otros",
    "No Sabe/No Responde",
  ];

  const cities = [
    "La Paz",
    "El Alto",
    "Cochabamba",
    "Oruro",
    "Potosí",
    "Chuquisaca",
    "Tarija",
    "Beni",
    "Pando",
    "Santa Cruz",
  ];

  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voterData, setVoterData] = useState({
    ci: "",
    age: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!selectedCandidate) newErrors.candidate = "Debe seleccionar un candidato.";
    if (!voterData.ci || !/^\d+$/.test(voterData.ci) || voterData.ci.length < 4) 
      newErrors.ci = "Ingrese un C.I. válido (mínimo 4 números).";
    if (!voterData.age || voterData.age < 18 || voterData.age > 120) 
      newErrors.age = "Debe ingresar una edad válida (mayor de 18).";
    if (!voterData.department) newErrors.department = "Seleccione un departamento.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVote = async () => {
    if (!validateForm()) return;

    const voteData = {
      candidato: selectedCandidate,
      votante: voterData,
      date: format(new Date(), "dd-MM-yyyy"),
    };

    try {
      const response = await fetch("https://encuestaapi.onrender.com/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData),
      });

      if (response.ok) {
        alert("✅ Votación registrada con éxito.");
        navigate("/sufragio", { state: voteData });
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
    <div className="container mt-4">
      <h1 className="text-center text-2xl font-bold">
        Elecciones Generales Bolivia 2025
      </h1>
      <h4 className="text-center mt-2 text-lg">
        Si hoy fueran las elecciones, ¿por quién votaría?
      </h4>

      <div className="row mt-5">
        {/* Candidatos */}
        <div className="col-md-6">
          <h2 className="text-center mb-3">Seleccione un candidato</h2>
          <div className="list-group">
            {candidates.map((candidate, index) => (
              <label key={index} className="list-group-item d-flex align-items-center">
                <input
                  type="radio"
                  name="candidate"
                  value={candidate}
                  checked={selectedCandidate === candidate}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="me-2"
                />
                {candidate}
              </label>
            ))}
          </div>
          {errors.candidate && <p className="text-danger mt-1">{errors.candidate}</p>}
        </div>

        {/* Datos del Votante */}
        <div className="col-md-6">
          <h2 className="text-center mb-3">Datos del Votante</h2>
          
          <div className="mb-3">
            <label htmlFor="ci" className="form-label">C.I.</label>
            <input
              type="text"
              id="ci"
              placeholder="C.I."
              value={voterData.ci}
              onChange={(e) => setVoterData({ ...voterData, ci: e.target.value })}
              className={`form-control ${errors.ci ? "is-invalid" : ""}`}
            />
            {errors.ci && <div className="invalid-feedback">{errors.ci}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">Edad</label>
            <input
              type="number"
              id="age"
              placeholder="Edad"
              value={voterData.age}
              onChange={(e) => {
                const age = parseInt(e.target.value, 10);
                if (!isNaN(age)) setVoterData({ ...voterData, age });
              }}
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              min="18"
              max="120"
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="department" className="form-label">Departamento</label>
            <select
              id="department"
              className={`form-control ${errors.department ? "is-invalid" : ""}`}
              value={voterData.department}
              onChange={(e) => setVoterData({ ...voterData, department: e.target.value })}
            >
              <option value="">Selecciona una opción</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>

          <div className="text-center">
            <button type="button" className="btn btn-success mt-4" onClick={handleVote}>
              Votar y Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
