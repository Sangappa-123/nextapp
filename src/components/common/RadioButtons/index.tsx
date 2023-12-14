import React from "react";
// { ChangeEvent }

interface RadioButtonProps {
  value: string;
  label: string;
}

interface RadioButtonsProps {
  options: RadioButtonProps[];
  // selectedOption: string | null;
  // onChange: (value: string) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ options }) => {
  // selectedOption, onChange
  return (
    <div>
      {options.map((option) => (
        <label key={option.value} style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value={option.value}
            // checked={selectedOption === option.value}
            // onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
