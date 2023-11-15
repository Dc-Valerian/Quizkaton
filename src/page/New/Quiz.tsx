import React, { useState, useEffect } from "react";
import Question from "./Question";
import InputComponent from "./InputComponent";
import Swal from "sweetalert2";

const Quiz: React.FC = () => {
  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of Nigeria?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of Canada?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of Usa?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of aoa?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of aoa?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of aoa?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of aoa?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of aoa?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    // Add more questions...
  ];

  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const handleOptionSelect = (selectedOption: string) => {
    setUserAnswer(selectedOption);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    clearTimeout(timer as number);

    const currentQuestionIndex = currentQuestion;
    if (currentQuestionIndex !== null) {
      const isCorrect =
        userAnswer === quizData[currentQuestionIndex].correctAnswer;
      const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

      Swal.fire({
        title: isCorrect ? "Correct!" : "Incorrect!",
        text: isCorrect
          ? `You Picked the correct answer: ${correctAnswer}`
          : `You Picked the wrong answer: ${userAnswer}. The correct answer is: ${correctAnswer}`,
        icon: isCorrect ? "success" : "error",
        confirmButtonText: "Next Question",
      }).then(() => {
        // Reset the current question index and hide the result
        setCurrentQuestion(null);
        setShowResult(false);
        // Clear the timer and set it again for the next question
        clearTimeout(timer as number);

        // Reset the time remaining to 0 seconds
        setTimeRemaining(0);

        // Start a new timer for the next question
        const questionTimer = setTimeout(() => {
          // Timer callback - remove the question and show a warning
          setCurrentQuestion(null);
          setShowResult(false);

          Swal.fire({
            title: "Time's up!",
            text: "You ran out of time for this question.",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }, 0); // Set to 0 milliseconds for an immediate callback

        setTimer(questionTimer);

        // Set a timer for updating the time remaining display every second
        const displayTimer = setInterval(() => {
          setTimeRemaining((prevTime) =>
            prevTime !== null && prevTime > 0 ? prevTime - 1 : null
          );
        }, 1000);

        // Clear the display timer when the question changes
        return () => clearInterval(displayTimer);
      });
    }
  };

  const handleQuestionNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearTimeout(timer as number);

    const value = parseInt(e.target.value, 10);

    if (isNaN(value) || value < 0 || value >= quizData.length) {
      setErrorMessage(
        `Please enter a valid question number. Number "${value}" is not in the database. Please select a number between 0 and ${
          quizData.length - 1
        }.`
      );
      setCurrentQuestion(null);
    } else {
      setErrorMessage("");
      setCurrentQuestion(value);

      // Set a timer for 30 seconds
      const questionTimer = setTimeout(() => {
        // Timer callback - remove the question and show a warning
        setCurrentQuestion(null);
        setShowResult(false);

        Swal.fire({
          title: "Time's up!",
          text: "You ran out of time for this question.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }, 30000);

      setTimer(questionTimer);

      // Set a timer for updating the time remaining display every second
      const displayTimer = setInterval(() => {
        setTimeRemaining((prevTime) =>
          prevTime !== null && prevTime > 0 ? prevTime - 1 : null
        );
      }, 1000);

      setTimeRemaining(30);

      // Clear the display timer when the question changes
      return () => clearInterval(displayTimer);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup function to clear the timer when the component unmounts
      clearTimeout(timer as number);
    };
  }, [timer]);

  const getTimeColor = (remainingTime: number | null): string => {
    return remainingTime !== null && remainingTime <= 10 ? "red" : "black";
  };

  return (
    <div>
      <InputComponent
        value={currentQuestion}
        onChange={handleQuestionNumberChange}
        errorMessage={errorMessage}
      />

      {timeRemaining !== null && (
        <div>
          <p style={{ color: getTimeColor(timeRemaining) }}>
            Time remaining: {timeRemaining} seconds
          </p>
        </div>
      )}

      {currentQuestion !== null && currentQuestion < quizData.length && (
        <Question
          question={quizData[currentQuestion].question}
          options={quizData[currentQuestion].options}
          onSelect={handleOptionSelect}
        />
      )}

      {showResult && (
        <div>
          <p>Your answer: {userAnswer}</p>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}

      {currentQuestion === quizData.length && (
        <p>Quiz completed! You did great!</p>
      )}
    </div>
  );
};

export default Quiz;
