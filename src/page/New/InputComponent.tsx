// components/InputComponent.tsx
import React from "react";

interface InputComponentProps {
  value: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <div>
      <label>
        Choose a question number:
        <input type="number" value={value === null ? "" : value} onChange={onChange} />
      </label>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default InputComponent;
