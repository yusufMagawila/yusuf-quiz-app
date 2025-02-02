import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure state is not undefined
  const { score = 0, totalQuestions = 0 } = location.state || {};

  const restartQuiz = () => {
    navigate("/");
  };

  return (
    <div className="results">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {totalQuestions}</p>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Results;
