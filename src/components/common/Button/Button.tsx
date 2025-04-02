import React from 'react';
import { Icon, iconName } from '../Icon/Icon';
import './Button.sass';

export type ButtonVariant = 'filled' | 'outline' | 'flattened';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  iconButton?: boolean;
  largeButton?: boolean;
  smallButton?: boolean;
  iconName?: iconName;
  iconSize?: number;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  variant = 'filled',
  iconButton = false,
  largeButton = false,
  smallButton = false,
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
        ${iconName && !smallButton ? 'button_with-icon' : ''}
        ${largeButton ? 'button_large' : ''}
        ${smallButton ? 'button_small' : ''}
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

      {children && (
        <span className="button__text">
          {children}
        </span>
      )}
    </button>
  );
};
