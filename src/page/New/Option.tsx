// components/Option.tsx
import React from "react";
import { OptionButton } from "./QuestionStyles";

interface OptionProps {
  text: string;
  onSelect: (selectedOption: string) => void;
}

const Option: React.FC<OptionProps> = ({ text, onSelect }) => {
  return <OptionButton onClick={() => onSelect(text)}>{text}</OptionButton>;
};

export default Option;
