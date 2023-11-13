import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { holdValue } from "../global/global";
import { deleteOneQuestion } from "../utils/APIs";
import quizData from "../data/question.json";

const LandingPage = () => {
  const allow = useRecoilValue(holdValue);
  const [question, setQuestion] = useState<any>({});
  const [filteredQuestion, setFilteredQuestion] = useState<any | null>(null);
  const [answering, setAnswering] = React.useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const check = () => {
    const isAnswerCorrect =
      filteredQuestion?.answer === question.selectedAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowPopup(true);
  };

  useEffect(() => {
    const filtered = quizData.data.find((item) => item.id === allow);
    setFilteredQuestion(filtered || null);
    setQuestion({});
    setShowPopup(false);
    setIsCorrect(null);
  }, [allow]);

  return (
    <div>
      <Container>
        {filteredQuestion ? (
          <Main key={filteredQuestion.id}>
            <div style={{ fontWeight: "600" }}>
              Attempting Question Number {allow}
            </div>
            <br />
            <Holder key={filteredQuestion.id}>
              <Card>{filteredQuestion.question}</Card>
              <Circle />
              <CircleII />
              <CircleIII />
            </Holder>
            <BottomCard>
              <CircleIV onClick={check}>Check</CircleIV>
              <But>
                <div style={{ display: "flex", alignItems: "center" }}>
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
                <div style={{ display: "flex", alignItems: "center" }}>
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
                <div style={{ display: "flex", alignItems: "center" }}>
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
                <div style={{ display: "flex", alignItems: "center" }}>
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
              <NavLink to="/start">
                <CircleV
                  onClick={() => {
                    deleteOneQuestion(allow);
                  }}
                >
                  Done
                </CircleV>
              </NavLink>
            </BottomCard>
            {showPopup && (
              <Popup bg={isCorrect ? "green" : "red"}>
                {isCorrect ? "Correct!" : "Wrong!"}
              </Popup>
            )}
          </Main>
        ) : (
          <Div>
            <div style={{ display: "flex" }}>Question "{allow}" not found.</div>
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

const Popup = styled.div<{ bg: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: ${({ bg }) => bg};
  color: white;
  font-size: 24px;
  font-weight: 700;
  border-radius: 10px;
  z-index: 999;
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
  background-color: ${({ bg }) => (bg ? "#0D1723" : "#34A853")};
  padding: 20px 28px;
  cursor: pointer;
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
