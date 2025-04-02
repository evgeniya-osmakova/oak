import React from 'react';
import { Icon, iconName } from '../Icon/Icon';

import './IconButton.sass';

interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  iconName: iconName;
  iconSize?: number;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconSize = 20,
  className,
  ...props
}) => {
  return (
    <button
      className={`icon-button ${className || ''}`}
      {...props}
    >
      <Icon
        name={iconName}
        size={iconSize}
      />
    </button>
  );
};
