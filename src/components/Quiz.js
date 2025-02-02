import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar"; // Ensure this component exists in the same directory
import "./Quiz.css";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Timer for each question
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion(); // Automatically move to the next question
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex]);

  const fetchQuizData = async () => {
    try {
      const response = await fetch(
        "https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error("No questions available.");
      }

      // Format questions
      const formattedQuestions = data.questions.map((q, index) => ({
        id: q.id || index + 1,
        question: q.description || "No Question Text",
        answers: q.options?.map((opt) => ({
          text: opt.description || "No Answer Text",
          isCorrect: opt.is_correct || false,
        })) || [],
      }));

      setQuizData(formattedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (isCorrect) => {
    setSelectedAnswer(isCorrect);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30); // Reset timer for the next question
    } else {
      navigate("/results", { state: { score, totalQuestions: quizData.length } });
    }
  };

  if (isLoading) return <p>Loading quiz...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="quiz-container">
      <h2>Quiz App</h2>
      {quizData.length > 0 && (
        <div>
          <ProgressBar current={currentQuestionIndex + 1} total={quizData.length} />
          <div className="score">Score: {score} / {quizData.length}</div>
          <div className="timer">Time left: {timeLeft} seconds</div>
          <h3>{quizData[currentQuestionIndex].question}</h3>
          <ul>
            {quizData[currentQuestionIndex].answers.map((answer, index) => (
              <li
                key={index}
                onClick={() => handleAnswerSelect(answer.isCorrect)}
                style={{
                  backgroundColor:
                    selectedAnswer === null
                      ? "white"
                      : answer.isCorrect
                      ? "green"
                      : "red",
                  cursor: selectedAnswer === null ? "pointer" : "default",
                }}
              >
                {answer.text}
              </li>
            ))}
          </ul>
          {selectedAnswer !== null && (
            <button onClick={handleNextQuestion}>Next Question</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
