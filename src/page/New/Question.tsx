// components/Question.tsx
import React from 'react';
import Option from './Option';

interface QuestionProps {
  question: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, onSelect }) => {
  return (
    <div>
      <h3>{question}</h3>
      {options.map((option, index) => (
        <Option key={index} text={option} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default Question;
