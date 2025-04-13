import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./page/home";
import Survey from "./page/survey";
import Results from "./page/result";
import VoteResult from "./page/vote_result";

export default function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/survey">Votar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/results">Resultados</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>

        {/* Configuración de Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/results" element={<Results />} />
          
          <Route path="/sufragio" element={<VoteResult />} />
        </Routes>
      </div>
    </Router>
  );
}
