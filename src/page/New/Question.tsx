// Question.tsx

import React from "react";
import styled from "styled-components";

interface QuestionProps {
  question: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
  correctAnswer: string;
  checking: boolean;
  greenOptions: string[];
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  onSelect,
  checking,
  greenOptions,
}) => {
  const getColor = (option: string): string => {
    if (checking && greenOptions.includes(option)) {
      return "green";
    } else if (checking) {
      return "red";
    } else {
      return "white";
    }
  };

  return (
    <div>
      <p>{question}</p>
      <OptionsWrapper>
        {options.map((option, index) => (
          <Option
            key={index}
            onClick={() => onSelect(option)}
            color={getColor(option)}
            cursor={checking ? "pointer" : "default"}
          >
            {option}
          </Option>
        ))}
      </OptionsWrapper>
    </div>
  );
};

export default Question;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface OptionProps {
  color: string;
  cursor: string;
}

const Option = styled.div<OptionProps>`
  padding: 10px;
  margin: 5px;
  color: orange;
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => props.color};

  &:hover {
    background-color: yellow;
  }
`;
