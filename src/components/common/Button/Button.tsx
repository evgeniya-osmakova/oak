import React from 'react';
import { Icon, iconName } from '../Icon/Icon';
import './Button.scss';

export type ButtonVariant = 'filled' | 'outline' | 'flattened';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  iconButton?: boolean;
  largeButton?: boolean;
  children: React.ReactNode;
  iconName?: iconName;
  iconSize?: number;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  iconButton = false,
  largeButton = false,
  children,
  className,
  iconName,
  iconSize = 20,
  ...props
}) => {
  return (
    <button
      className={`
        button 
        button_${variant}
        ${iconButton ? 'button_icon-button' : ''}
        ${iconName ? 'button_with-icon' : ''}
        ${largeButton ? 'button_large' : ''}
        ${className || ''}
      `.trim()}
      {...props}
    >
      {iconName && (
        <Icon
          name={iconName}
          size={iconSize}
          className="button__icon"
        />
      )}

      <span
          className="button__text"
      >
          {children}
      </span>
    </button>
  );
};
