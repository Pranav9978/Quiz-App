import { useEffect, useState } from "react";
import questions from "./questions.js";
import "./App.css";

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setTimeLeft(10);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="header">
        <h1>Quiz App</h1>
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </header>

      {showResult ? (
        <div className="result">
          <h2>Your Score</h2>
          <p>{score} / {questions.length}</p>
        </div>
      ) : (
        <div className="quiz">
          <div className="timer">⏱ {timeLeft}s</div>
          <h2>{questions[current].question}</h2>

          {questions[current].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Developer Info */}
      <div className="developer">
        Developed by{" "}
        <a
          href="https://pranav-portfolio-theta.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pranav Khegade
        </a>
      </div>
    </div>
  );
}

export default App;
   