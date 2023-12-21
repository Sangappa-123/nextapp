import React from "react";
import RadioButtonstyle from "./RadioButton.module.scss";
// { ChangeEvent }

interface RadioButtonProps {
  value: string;
  label: string;
}

interface RadioButtonsProps {
  options: RadioButtonProps[];
  selectedOption: string | null;
  onChange: (value: string) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  // selectedOption, onChange
  return (
    <div>
      {options.map((option) => (
        <label key={option.value} className={RadioButtonstyle.marginRight}>
          <input
            type="radio"
            value={option.value}
            className={RadioButtonstyle.marginRight}
            checked={selectedOption === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
