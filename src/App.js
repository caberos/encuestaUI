import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ElectoralSurvey from "./page/electoral_survey.jsx";
import PrivacyPolicy from "./page/privacyPolicy.jsx";
import VoteResult from "./page/vote_result.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
                  <Route path="/" element={<ElectoralSurvey />} />
                  <Route path="/resultado" element={<VoteResult />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
