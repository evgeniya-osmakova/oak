import React from 'react';
import './Input.scss';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onValueChange: (value: string) => void;
  small?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  small,
  onValueChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div className={`input-container ${small ? 'input-container__small' : ''}`}>
      <input
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
