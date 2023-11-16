import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { holdValue } from "../global/global";
import quizData from "../data/question.json";
import Swal from "sweetalert2";

const LandingPage = () => {
  const allow = useRecoilValue(holdValue);
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState<any[]>([]);
  const [filteredQuestion, setFilteredQuestion] = useState<any | null>(null);
  const [answering, setAnswering] = React.useState(false);
  const [answered, setAnswered] = useState<boolean>(false);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30); // Timer duration in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  const check = () => {
    setAnswering(!answering);
    if (answeredQuestions.find((q) => q.id === allow)) {
      setQuestionAnswered(true);
    } else {
      setAnswered(true);
      setQuestionAnswered(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    startTimer(); // Start the timer when an option is selected
    // Add logic to handle other functionalities when an option is selected
  };

  useEffect(() => {
    const filtered = quizData.data.find((item) => item.id === allow);
    setFilteredQuestion(filtered || null);
    setAnswered(false);
    setAnswering(false);
    setQuestionAnswered(false);
  }, [allow]);

  const handleDoneClick = () => {
    if (!answered) {
      // Move the answered question to the answeredQuestions list
      setAnsweredQuestions([...answeredQuestions, filteredQuestion]);

      // Remove the answered question from the unansweredQuestions list
      setUnansweredQuestions(
        unansweredQuestions.filter((item) => item.id !== allow)
      );

      // Remove the answered question from the JSON data file
      const updatedData = quizData.data.filter((item) => item.id !== allow);
      quizData.data = updatedData;
    }
  };

  useEffect(() => {
    // On component mount, set the unansweredQuestions list to include all questions
    setUnansweredQuestions(quizData.data);
  }, []);

  const getRandomUnansweredQuestion = () => {
    const remainingQuestions = unansweredQuestions.filter(
      (question) => !answeredQuestions.find((q) => q.id === question.id)
    );

    if (remainingQuestions.length === 0) {
      // All questions answered
      return null;
    }

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    return remainingQuestions[randomIndex];
  };

  useEffect(() => {
    // Set a new random question when all questions are answered
    if (answeredQuestions.length === quizData.data.length) {
      const randomQuestion = getRandomUnansweredQuestion();
      setFilteredQuestion(randomQuestion);
      setAnswered(false);
      setAnswering(false);
      setQuestionAnswered(false);
    }
  }, [answeredQuestions]);

  const startTimer = () => {
    setTimerRunning(true);
    setTimeLeft(30); // Reset timer to 30 seconds
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (timerRunning) {
      timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          setTimerRunning(false);
          Swal.fire({
            title: "Time's up!",
            text: "Your time has elapsed.",
            icon: "warning",
            confirmButtonText: "OK",
          }).then(() => {
            // Handle what happens when time elapses (e.g., go back to input)
            // For example:
            // Redirect to the input page
          });
        }
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerRunning]);

  return (
    <div>
      <Container>
        {filteredQuestion ? (
          <Main key={filteredQuestion.id}>
            <div style={{ fontWeight: "600" }}>
              Attempting Question Number {allow}
            </div>
            {/* Display timer at the top */}
            <Timer>{timeLeft} seconds</Timer>
            <br />
            <Holder key={filteredQuestion.id}>
              <Card>{filteredQuestion.question}</Card>
              <Circle />
              <CircleII />
              <CircleIII />
            </Holder>
            {selectedOption && <div>You have selected: {selectedOption}</div>}

            <BottomCard>
              <CircleIV onClick={check}>Check</CircleIV>
              <But>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleOptionSelect(filteredQuestion?.a)}
                >
                  {" "}
                  A.
                  {answering ? (
                    <Butt
                      bg={
                        filteredQuestion?.a === filteredQuestion?.answer
                          ? ""
                          : "f"
                      }
                    >
                      {filteredQuestion?.a}
                    </Butt>
                  ) : (
                    <div>
                      <Butt bg="grey">{filteredQuestion.a}</Butt>
                    </div>
                  )}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleOptionSelect(filteredQuestion?.b)}
                >
                  {" "}
                  B.
                  {answering ? (
                    <Butt
                      bg={
                        filteredQuestion?.b === filteredQuestion?.answer
                          ? ""
                          : "f"
                      }
                    >
                      {filteredQuestion?.b}
                    </Butt>
                  ) : (
                    <div>
                      <Butt bg="grey">{filteredQuestion.b}</Butt>
                    </div>
                  )}
                </div>
              </But>
              <But>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleOptionSelect(filteredQuestion?.c)}
                >
                  C.
                  {answering ? (
                    <Butt
                      bg={
                        filteredQuestion?.c === filteredQuestion?.answer
                          ? ""
                          : "f"
                      }
                    >
                      {filteredQuestion?.c}
                    </Butt>
                  ) : (
                    <div>
                      <Butt bg="grey">{filteredQuestion?.c}</Butt>
                    </div>
                  )}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleOptionSelect(filteredQuestion?.d)}
                >
                  {" "}
                  D.
                  {answering ? (
                    <Butt
                      bg={
                        filteredQuestion?.d === filteredQuestion?.answer
                          ? ""
                          : "f"
                      }
                    >
                      {filteredQuestion?.d}
                    </Butt>
                  ) : (
                    <div>
                      <Butt bg="grey">{filteredQuestion?.d}</Butt>
                    </div>
                  )}
                </div>
              </But>
              {questionAnswered && (
                <Message>
                  Sorry, this question has already been answered.
                </Message>
              )}

              <NavLink to="/start">
                <CircleV onClick={handleDoneClick}>Done</CircleV>
              </NavLink>
              {/* <Button onClick={handleShowAnswered}>
                Show Answered Questions
              </Button>
              <Button onClick={handleShowUnanswered}>
                Show Unanswered Questions
              </Button> */}
            </BottomCard>
          </Main>
        ) : (
          <Div>
            <div style={{ display: "flex" }}>
              Question "{allow}" is not in the dataBase.
            </div>
            <NavLink
              to="/start"
              style={{ textDecoration: "none", color: "white" }}
            >
              <CircleIVI onClick={check}>Go Back</CircleIVI>
            </NavLink>
          </Div>
        )}
      </Container>
    </div>
  );
};

export default LandingPage;
const Timer = styled.div`
  background-color: rosybrown;
  font-size: 18px;
  margin-bottom: 10px;
`;
const Message = styled.div`
  color: red;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 30px;
  font-weight: 900;
`;

const CircleV = styled.div`
  position: absolute;
  right: 13%;
  border-radius: 50%;
  z-index: 2;
  background: rgba(208, 2, 27, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  cursor: pointer;
  transition: all 350ms;
  top: 30px;
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 20px;

  :hover {
    background: rgba(208, 2, 27, 0.25);
  }
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  @-webkit-keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;

const CircleIV = styled.div`
  position: absolute;
  left: 13%;
  border-radius: 10px;
  z-index: 2;
  background: rgba(87, 208, 2, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 350ms;
  width: 100px;
  height: 90px;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  :hover {
    background: rgba(87, 208, 2, 0.25);
  }
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  @-webkit-keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;

const CircleIVI = styled.div`
  left: 13%;
  border-radius: 10px;
  z-index: 2;
  background: rgba(87, 208, 2, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 350ms;
  width: 160px;
  height: 90px;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  :hover {
    background: rgba(87, 208, 2, 0.25);
  }
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
  @-webkit-keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;

const CircleIII = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  position: absolute;
  bottom: -20px;
  right: 200px;
  z-index: -100;
  transform: rotate(45deg);
`;
const CircleII = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  background: rgba(225, 225, 225, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  border: 1px solid rgba(255, 255, 255, 0.18);

  position: absolute;
  top: 68px;
  right: -70px;
  z-index: -100;
`;

const Circle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 100%;

  background: rgba(225, 225, 225, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  /* border-radius: 10px; */
  border: 1px solid rgba(255, 255, 255, 0.18);

  position: absolute;
  top: -48px;
  left: -40px;
  z-index: -100;
`;

const Butt = styled.div<{ bg: string }>`
  margin: 20px;
  background-color: ${({ bg }) => (bg ? "pink" : "#34A853")};
  padding: 20px 28px;
  cursor: pointer;

  &:hover {
    background-color: orange;
  }
`;

const But = styled.div`
  display: flex;
`;

const BottomCard = styled.div`
  background-color: #213a5a;
  min-height: 200px;
  position: relative;
  min-width: 85%;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  /* position: relative; */
  padding: 0 10px;
`;

const Holder = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  text-overflow: break-word;
  z-index: 100;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 50px;
`;

const Card = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  text-overflow: break-word;
  z-index: 100;
  position: absolute;
  padding: 10px 15px;

  background: rgba(247, 201, 169, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(14.5px);
  -webkit-backdrop-filter: blur(14.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-weight: 700;
  font-size: 25px;
`;

const Main = styled.div`
  width: 80%;
  height: 99.1vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  background: rgb(82, 150, 228);
  background: linear-gradient(
    0deg,
    rgba(82, 150, 228, 1) 50%,
    rgba(43, 101, 193, 1) 100%,
    rgba(47, 110, 211, 1) 100%
  );
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
`;
