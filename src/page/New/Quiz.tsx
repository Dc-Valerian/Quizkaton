import React, { useState, useEffect } from "react";
import Question from "./Question";
import InputComponent from "./InputComponent";
import Swal from "sweetalert2";
import quizData from "./quizData";

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);
  const [greenOptions, setGreenOptions] = useState<string[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);
  // const [showAnswered, setShowAnswered] = useState(true);

  const handleOptionSelect = (selectedOption: string) => {
    setUserAnswer(selectedOption);
    setShowResult(true);
    if (userAnswers.includes(selectedOption)) {
      Swal.fire({
        title: "This question has been answered",
        text: "Please choose another question.",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        // Reset the current question index and hide the result
        setCurrentQuestion(null);
        setShowResult(false);
        setUserAnswer(""); // Reset user's answer
        // Clear the timer and set it again for the next question
        clearTimeout(timer as number);
        setTimeRemaining(0);
      });
    } else {
      setUserAnswers([...userAnswers, selectedOption]);

      // Remove the answered question from the quizData array
      if (currentQuestion !== null) {
        const updatedQuizData = [...quizData];
        updatedQuizData.splice(currentQuestion, 1);
        // Update the local quizData directly
        // quizData = updatedQuizData; // Uncomment this line if quizData is a let variable
        // Otherwise, manage it through state or other appropriate state management
      }

      // Rest of your logic for handling the selected option
    }
    // If the current question was answered, update the state for answered questions
    if (!userAnswers.includes(selectedOption)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion as number]);
    }

    // Update the state for unanswered questions
    const updatedUnansweredQuestions = unansweredQuestions.filter(
      (question) => question !== currentQuestion
    );
    setUnansweredQuestions(updatedUnansweredQuestions);
  };

  const handleNextQuestion = () => {
    clearTimeout(timer as number);

    const currentQuestionIndex = currentQuestion;
    if (currentQuestionIndex !== null) {
      const isCorrect =
        userAnswer === quizData[currentQuestionIndex].correctAnswer;

      if (timeRemaining !== null && timeRemaining <= 0) {
        // Time has elapsed, show "Time's up!" alert
        Swal.fire({
          title: "Time's up!",
          text: "You ran out of time for this question.",
          icon: "warning",
          showCancelButton: true, // Show Cancel button
          confirmButtonText: "OK",
          cancelButtonText: "Cancel", // Set Cancel button text
        }).then((result) => {
          if (result.isConfirmed) {
            // User clicked OK, handle accordingly
            // Reset the current question index and hide the result
            setCurrentQuestion(null);
            setShowResult(false);
            // Clear the timer and set it again for the next question
            clearTimeout(timer as number);
            setTimeRemaining(0);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // User clicked Cancel, handle accordingly
            // For example, navigate the user back
            console.log("User clicked Cancel");
          }
        });
      } else {
        // User answered before time ran out
        Swal.fire({
          title: isCorrect ? "Correct!" : "Incorrect!",
          text: isCorrect
            ? `You Picked the correct answer: ${userAnswer}`
            : `You Picked the wrong answer: ${userAnswer}.`,
          icon: isCorrect ? "success" : "error",
          showCancelButton: true, // Show Cancel button
          confirmButtonText: "Next Question",
          cancelButtonText: "Cancel", // Set Cancel button text
        }).then((result) => {
          if (result.isConfirmed) {
            // User clicked Next Question, handle accordingly
            // Reset the current question index and hide the result
            setCurrentQuestion(null);
            setShowResult(false);
            // Clear the timer and set it again for the next question
            clearTimeout(timer as number);
            setTimeRemaining(0);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // User clicked Cancel, handle accordingly
            // For example, navigate the user back
            console.log("User clicked Cancel");
          }
        });
      }
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
    // Set the current question
    setCurrentQuestion(value);

    // Update unanswered questions excluding the current question
    const updatedUnanswered = Array.from(Array(quizData.length).keys()).filter(
      (question) => question !== value
    );
    setUnansweredQuestions(updatedUnanswered);
  };

  const handleCheck = () => {
    if (!checking && userAnswer) {
      setChecking(true);

      // Identify one correct and one wrong answer to highlight
      const correctAnswer = quizData[currentQuestion as number].correctAnswer;
      const options = quizData[currentQuestion as number].options.filter(
        (option) => option !== correctAnswer
      );
      const wrongAnswer = options[Math.floor(Math.random() * options.length)];

      setGreenOptions([correctAnswer, wrongAnswer]);
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
          correctAnswer={quizData[currentQuestion].correctAnswer}
          checking={checking}
          greenOptions={greenOptions}
        />
      )}

      {showResult && (
        <div>
          <p>Your answer: {userAnswer}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleCheck} disabled={!userAnswer || checking}>
              Check
            </button>
            {/* {checking && ( */}
            <>
              <button onClick={handleNextQuestion}>Next Question</button>
              <button onClick={() => setChecking(false)}>Cancel</button>
            </>
            {/* )} */}
          </div>
          {checking && currentQuestion === quizData.length && (
            <p>Quiz completed! You did great!</p>
          )}
        </div>
      )}

      {/* <div>
        <button onClick={() => setShowAnswered(true)}>
          Show Answered Questions
        </button>
        <button onClick={() => setShowAnswered(false)}>
          Show Unanswered Questions
        </button>

        {showAnswered ? (
          <div>
            <h2>Answered Questions:</h2>
            {answeredQuestions.map((questionNumber) => (
              <div key={questionNumber}>
             
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2>Unanswered Questions:</h2>
            {unansweredQuestions.map((questionNumber) => (
              <div key={questionNumber}>
              
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Quiz;
