import React, { useId } from 'react'

import './Input.sass';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  smallLabel?: boolean;
  smallInput?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  label,
  smallLabel,
  smallInput,
  onValueChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  const inputId = useId();

  return (
    <>
      <label
          className={`input__label ${smallLabel ? 'input__label_small' : ''}`}
          htmlFor={inputId}
      >
        {label}
      </label>

      <div className={`input__container ${smallInput ? 'input__container_small' : ''}`}>
        <input
          id={inputId}
          className="input__field"
          value={value}
          onChange={handleChange}
          {...props}
        />
      </div>
    </>
  );
};
