import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

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
    "Chuquisaca", "Tarija", "Beni", "Pando", "Santa Cruz",
  ];

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voterData, setVoterData] = useState({
    ci: "",
    age: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error cargando anuncio:", e);
    }
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!selectedCandidate) newErrors.candidate = "Debe seleccionar un candidato.";
    if (!voterData.ci || !/^\d{4,}$/.test(voterData.ci))
      newErrors.ci = "C.I. inválido (mínimo 4 dígitos numéricos).";
    const age = parseInt(voterData.age, 10);
    if (!voterData.age || isNaN(age) || age < 18 || age > 120)
      newErrors.age = "Edad inválida (debe ser mayor de 18).";
    if (!voterData.department) newErrors.department = "Seleccione un departamento.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVote = async () => {
    if (!validateForm()) return;

    const voteData = {
      candidato: selectedCandidate.name,
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
        navigate("/resultado", { state: voteData });
      } else if (response.status === 409) {
        alert("⚠️ Este C.I. ya fue registrado anteriormente.");
      } else {
        alert("❌ Error al guardar. Intente nuevamente.");
      }
    } catch (error) {
      alert("❌ No se pudo conectar al servidor.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-2xl fw-bold mb-2">
        Elecciones Generales Bolivia 2025
      </h1>
      <p className="text-center text-muted mb-4">
        Esta encuesta es anónima y con fines estadísticos. No representa resultados oficiales.
      </p>

      <div className="d-flex justify-content-center mb-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-7727148443229606"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <h4 className="text-center mt-3 text-lg">
        Si hoy fueran las elecciones, ¿por quién votaría?
      </h4>

      <div className="row mt-4">
        {/* Lista de candidatos */}
        <div className="col-md-6 mt-3 d-flex flex-column align-items-center">
          <h2 className="text-xl fw-semibold mb-2">Seleccione un candidato</h2>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td className="text-center">{candidate.name}</td>
                  <td className="text-center">
                    <button
                      className={`btn btn-${
                        selectedCandidate === candidate ? "primary" : "secondary"
                      }`}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      {selectedCandidate === candidate ? "Seleccionado" : "Seleccionar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {errors.candidate && <p className="text-danger mt-1">{errors.candidate}</p>}
        </div>

        {/* Datos del votante */}
        <div className="col-md-6 mt-3 d-flex flex-column align-items-center">
          <h2 className="text-xl fw-semibold mb-2">Datos del Votante</h2>

          <div className="mb-3 w-75">
            <label htmlFor="ci" className="form-label">C.I.</label>
            <input
              type="text"
              id="ci"
              placeholder="C.I"
              value={voterData.ci}
              onChange={(e) =>
                setVoterData({ ...voterData, ci: e.target.value })
              }
              className={`form-control text-center ${errors.ci ? "is-invalid" : ""}`}
            />
            {errors.ci && <div className="invalid-feedback">{errors.ci}</div>}
          </div>

          <div className="mb-3 w-75">
            <label htmlFor="age" className="form-label">Edad</label>
            <input
              type="number"
              id="age"
              placeholder="Edad"
              value={voterData.age}
              onChange={(e) =>
                setVoterData({ ...voterData, age: e.target.value })
              }
              className={`form-control text-center ${errors.age ? "is-invalid" : ""}`}
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>

          <div className="w-75">
            <label htmlFor="department" className="form-label">Departamento:</label>
            <select
              id="department"
              className={`form-control text-center ${errors.department ? "is-invalid" : ""}`}
              value={voterData.department}
              onChange={(e) =>
                setVoterData({ ...voterData, department: e.target.value })
              }
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
