import React from 'react';
import { Icon, iconName } from '../../Icon/Icon';
import './Card.scss';

interface CardProps {
  title: string;
  icon?: iconName;
  iconTitle?: string;
  onClick?: () => void;
  children: React.ReactNode;
  isEditing?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  icon,
  iconTitle,
  onClick,
  children,
  isEditing,
  onSave,
  onCancel
}) => {
  return (
    <div className="company-content">
      <div className="content-header">
        <h2>{title}</h2>

        {!isEditing && icon && (
          <button className="edit-button" onClick={onClick}>
            <Icon name={icon} />
            {iconTitle && <span>{iconTitle}</span>}
          </button>
        )}

        {isEditing && (
          <div className="action-buttons">
            <button className="edit-button" onClick={onSave}>
              <Icon name="check" />
              <span>Save changes</span>
            </button>

            <button className="edit-button" onClick={onCancel}>
              <Icon name="close" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};
