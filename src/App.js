import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Quiz Page */}
          <Route path="/quiz" element={<Quiz />} />

          {/* Results Page */}
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;