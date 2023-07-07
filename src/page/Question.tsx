import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { deleteOneQuestion } from "../Utils/schoolAPI";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil"
import { holdValue } from "../global/global";
import { deleteOneQuestion, getOneQuestion } from "../utils/APIs";

const LandingPage = () => {

  // const data = [
  //   {
  //     id: 1,
  //     question: "Which of the following css property is used to make an element move from a particular direction to another...",
  //     answer: "flex-direction",
  //     a: "justify-content",
  //     b: "align-items",
  //     c: "flex-direction",
  //     d: "display: flex"
  //   },
  //   {
  //     id: 2,
  //     question: "Which of the following css property is used to make an element move horizontally from a particular direction to another...",
  //     answer: "justify-content",
  //     a: "justify-content",
  //     b: "align-items",
  //     c: "flex-end",
  //     d: "flex-start"
  //   },
  //   {
  //     id: 3,
  //     question: "Which of the following css property is used to make an element move vertically from a particular direction to another...",
  //     answer: "align-items",
  //     a: "flex-start",
  //     b: "space-around",
  //     c: "justify-content",
  //     d: "align-items"
  //   },
  //   {
  //     id: 4,
  //     question: "What is the full meaning of HTML...",
  //     answer: "Hyper-Text Markup Language",
  //     a: "Hype-Transfer Marking Language",
  //     b: "Hyper-Text Model Language",
  //     c: "Hyper-Text Markup Language",
  //     d: "Hyper-Text Morkup Language"
  //   },
  //   {
  //     id: 5,
  //     question: "What is the full meaning of CSS...",
  //     answer: "Cascading Style Sheet",
  //     a: "Cascader Styler Sheets",
  //     b: "Cascading Style Sheet",
  //     c: "Card Styles Sheets",
  //     d: "Computing Styled Sheet"
  //   },
  //   {
  //     id: 6,
  //     question: "The following are examples of Text Editors used for coding...",
  //     answer: "Notepad, Visual Studio Code",
  //     a: "Ms-Server, Notes",
  //     b: "Ms-word, Ms-excel",
  //     c: "Notebox++, Vs-Version",
  //     d: "Notepad, Visual Studio Code"
  //   },
  //   {
  //     id: 7,
  //     question: "Which of the following tags are used for creating links",
  //     answer: "<a>Tag",
  //     a: "<h1>Tag",
  //     b: "<head>Tag",
  //     c: "<title>Tag",
  //     d: "<a>Tag"
  //   },
  //   {
  //     id: 8,
  //     question: "The extension that is used when creating an HTML File is called...",
  //     answer: ".html extention",
  //     a: ".css extension",
  //     b: "cmd extension",
  //     c: ".ts extention",
  //     d: ".html extention",
  //   },
  //   {
  //     id: 9,
  //     question: "Which of the following term is used when refering to defining the skeleton of a webpage...",
  //     answer: "HTML",
  //     a: "HTML",
  //     b: "CSS",
  //     c: "Boxification",
  //     d: "Website"
  //   },
  //   {
  //     id: 10,
  //     question: "Identify a self-closing tag",
  //     answer: "<br/>",
  //     a: "</br>",
  //     b: "<br></br>",
  //     c: "<br/>",
  //     d: "<br>",
  //   },
  //   {
  //     id: 11,
  //     question: "What is the current version of HTML",
  //     answer: "HTML5",
  //     a: "HXML5",
  //     b: "HTML5",
  //     c: "XML5",
  //     d: "HTML25",
  //   },
  //   {
  //     id: 12,
  //     question: "Browser used in viewing your result when done coding are all except one ",
  //     answer: "Google Earth",
  //     a: "Google chrome",
  //     b: "Firefox",
  //     c: "Google Earth",
  //     d: "Opera mini",
  //   },
  //   {
  //     id: 13,
  //     question: "What property is used to change the default color of a text to another color",
  //     answer: "color",
  //     a: "background-color",
  //     b: "border-color",
  //     c: "text-color",
  //     d: "color",
  //   },
  //   {
  //     id: 14,
  //     question: "What html tag is used to make a text bold",
  //     answer: "<b></b>",
  //     a: "<b></b>",
  //     b: "<bold></bold>",
  //     c: "<large></large>",
  //     d: "<big></big>",
  //   },
  //   {
  //     id: 15,
  //     question: "What css property is used to make your text bold",
  //     answer: "font-weight",
  //     a: "text-size",
  //     b: "font-family",
  //     c: "font-width",
  //     d: "font-weight",
  //   },
  //   {
  //     id: 16,
  //     question: "These are html tags except one",
  //     answer: "<bi></bi",
  //     a: "<i></i>",
  //     b: "<h2></h2>",
  //     c: "<bi></bi",
  //     d: "<h1></h1>",
  //   },
  //   {
  //     id: 17,
  //     question: "Which of the following symbols signifies that a particular tag has a 'Class' ",
  //     answer: ".",
  //     a: "*",
  //     b: "-",
  //     c: "!",
  //     d: ".",
  //   },
  //   {
  //     id: 18,
  //     question: "Which of the following symbols signifies that a particular tag has an 'ID' ",
  //     answer: "#",
  //     a: "*",
  //     b: "-",
  //     c: "$",
  //     d: "#",
  //   },
  //   {
  //     id: 19,
  //     question: "What is the unit of measurement for font size in CSS?",
  //     answer: "px",
  //     a: "%",
  //     b: "vm",
  //     c: "px",
  //     d: "pz",
  //   },
  //   {
  //     id: 20,
  //     question: "What is the purpose of the `<img>` tag?",
  //     answer: "The `<img>` tag is used to insert an image into a web page.",
  //     a: "The `<img>` tag is used to insert an icon into a web page.",
  //     b: "The `<img>` tag is used to insert an image into a web page.",
  //     c: "The `<img>` tag is used to insert an imagination into a web page.",
  //     d: "The `<img>` tag is used to insert an complier into a web page.",
  //   },
  //   {
  //     id: 21,
  //     question: "What is the purpose of the `DOCTYPE` declaration?",
  //     answer: "It is used to declare the type of document that is being created.",
  //     a: "It is used to declare the type of document that is being created.",
  //     b: "It is used to deleted the type of document that is being created.",
  //     c: "It is used to format the type of document that is being created.",
  //     d: "It is used to modify the type of document that is being created.",
  //   },
  //   {
  //     id: 22,
  //     question: "With what exact Tags can a list be created in HTML?",
  //     answer: "<ul>&<ol>",
  //     a: "<list>&<ol>",
  //     b: "<il>&<ul>",
  //     c: "<ul>&<ol>",
  //     d: "<il>&<list>",
  //   },
  //   {
  //     id: 23,
  //     question: "What is the closing tag for a paragraph element?",
  //     answer: "</p>",
  //     a: "<p/>",
  //     b: "</pg>",
  //     c: "</p>",
  //     d: "<pg/>",
  //   },
  //   {
  //     id: 24,
  //     question: "Which CSS property enables the manipulation of spaces around a container?",
  //     answer: "margin",
  //     a: "margin",
  //     b: "padding",
  //     c: "flex",
  //     d: "position",
  //   },
  //   {
  //     id: 25,
  //     question: "Which CSS property enables the manipulation of spaces inside of a container?",
  //     answer: "padding",
  //     a: "margin",
  //     b: "padding",
  //     c: "flex",
  //     d: "position",
  //   },
  //   {
  //     id: 26,
  //     question: "What is the CSS property for changing the size of an element?",
  //     answer: "width",
  //     a: "size",
  //     b: "weight",
  //     c: "width",
  //     d: "wide",
  //   },
  //   {
  //     id: 27,
  //     question: "What is the CSS property for containing the exceedings of elements in a container?",
  //     answer: "flex-wrap",
  //     a: "flex",
  //     b: "flex-direction",
  //     c: "contain",
  //     d: "flex-wrap",
  //   },
  //   {
  //     id: 28,
  //     question: "What is the closing tag for the HTML structure?",
  //     answer: "</html>",
  //     a: "<html/>",
  //     b: "<html>",
  //     c: "</html>",
  //     d: "</Html>",
  //   },
  //   {
  //     id: 29,
  //     question: "What is the CSS property for smoothen the straight edges of an element?",
  //     answer: "border-arc",
  //     a: "border-line",
  //     b: "curver",
  //     c: "border-arc",
  //     d: "border-radius",
  //   },
  //   {
  //     id: 6,
  //     question: "What is the difference between inline CSS, embedded CSS, and external CSS?",
  //     answer: "Inline CSS is placed inside the HTML document, embedded CSS is placed outside the `<head>` tag, and external CSS is placed in a separate file.",
  //     a: "Inline CSS is placed outside the HTML document, embedded CSS is placed inside the `<head>` tag,and external CSS is placed in a separate file.",
  //     b: "Inline CSS is placed inside the HTML document, embedded CSS is placed inside the `<head>` tag,and external CSS is placed in a separate file.",
  //     c: "Inline CSS is placed inside the HTML document, embedded CSS is placed outside the `<head>` tag, and external CSS is placed in a separate file.",
  //     d: "Inline CSS is placed inside the HTML document, embedded CSS is placed inside the `<head>` tag,and external CSS is placed in the same file.",
  //   }
  // ];

  // const fn = (value: number) => {
  //   const question = data.filter((e) => e.id === value);
  //   return question;
  // };

  const allow = useRecoilValue(holdValue);
  const [question, setQuestion] = useState<any>({})


  // React.useEffect(() => {
  //   console.log("data", fn(allow));
  // }, []);

  const [answering, setAnswering] = React.useState(false);
  const check = () => {
    setAnswering(!answering);
  };

  // useEffect(() => {
  //   getOneQuestion(allow).then((res: any) => {
  //     setQuestion(res)
  //   })
  // }, [])

  console.log(question)

  return (
    <div>
      <Container>

        {
          question ?
            <Main>
              <div style={{ fontWeight: "600" }} >Attempting Question Number {allow}</div>
              <br />
              <Holder>
                <Card>{question?.question}</Card>
                <Circle />
                <CircleII />
                <CircleIII />
              </Holder>
              <BottomCard>
                <CircleIV onClick={check}>Check</CircleIV>
                <But>
                  <div style={{ display: "flex", alignItems: "center" }}> A.
                    {answering ? (
                      <Butt bg={question?.a === question?.answer ? "" : "f"}>
                        {question?.a}
                      </Butt>
                    ) : (
                      <div>
                        <Butt bg="grey">{question.a}</Butt>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}> B.
                    {answering ? (
                      <Butt bg={question?.b === question?.answer ? "" : "f"}>
                        {question?.b}
                      </Butt>
                    ) : (
                      <div>
                        <Butt bg="grey">{question.b}</Butt>
                      </div>
                    )}
                  </div>
                </But>
                <But>
                  <div style={{ display: "flex", alignItems: "center" }} >C.
                    {answering ? (
                      <Butt bg={question?.c === question?.answer ? "" : "f"}>
                        {question?.c}
                      </Butt>
                    ) : (
                      <div>
                        <Butt bg="grey">{question?.c}</Butt>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", }}> D.
                    {answering ? (
                      <Butt bg={question?.d === question?.answer ? "" : "f"}>
                        {question?.d}
                      </Butt>
                    ) : (
                      <div>
                        <Butt bg="grey">{question?.d}</Butt>
                      </div>
                    )}
                  </div>
                </But>
                <NavLink to="/start">
                  <CircleV
                    onClick={() => {
                      deleteOneQuestion(allow)
                    }}
                  >Done</CircleV>
                </NavLink>
              </BottomCard>
            </Main> :

            <Div>
              <div style={{ display: "flex" }} >
                Question "<div style={{ color: "red", margin: "0 5px", fontSize: "50px", marginBottom: "30px", }}>{allow}</div>" has already been Taken
              </div>
              <NavLink to="/start" style={{ textDecoration: "none", color: "white" }} >
                <CircleIVI onClick={check}>Go Back</CircleIVI>
              </NavLink>

            </Div>
        }

      </Container>
    </div>
  );
};

export default LandingPage;

const Div = styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
font-size: 30px;
font-weight: 900;

`

const CircleV = styled.div`
  position: absolute;
  right: 13%;
  border-radius: 50%;
  z-index: 2;
 background: rgba( 208, 2, 27, 0.15 );
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
  top:30px;
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 20px;

  :hover {
    background: rgba( 208, 2, 27, 0.25 );
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
  background: rgba( 87, 208, 2, 0.15 );
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
    background: rgba( 87, 208, 2, 0.25 );
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
  background: rgba( 87, 208, 2, 0.15 );
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
    background: rgba( 87, 208, 2, 0.25 );
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
  background-color: ${({ bg }) => bg ? "#0D1723" : "#34A853"};
  padding: 20px 28px;
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
  padding:10px 15px;

  background: rgba( 247, 201, 169, 0.25 );
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
