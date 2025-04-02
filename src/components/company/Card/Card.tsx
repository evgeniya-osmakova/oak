import React from 'react';
import { iconName } from '../../common/Icon/Icon';
import { Button } from '../../common/Button/Button'

import './Card.scss';

interface CardProps {
  title: string;
  icon: iconName;
  iconTitle: string;
  children: React.ReactNode;
  onClick: () => void;
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
  const handleEdit = () => {
    onClick();
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">
          {title}
        </h2>

        {isEditing ? (
          <div className="card__actions">
            <Button
                variant="flattened"
                onClick={handleSave}
                iconName="check"
                iconSize={16}
            >
              Save changes
            </Button>

            <Button
                variant="flattened"
                onClick={handleCancel}
                iconName="close"
                iconSize={16}
            >
              Cancel
            </Button>
          </div>
        ) : (
            <Button
                variant="flattened"
                onClick={handleEdit}
                iconName={icon}
                iconSize={16}
            >
              {iconTitle}
            </Button>
        )}
      </div>

      <div className={`card__grid ${isEditing ? 'card__grid_editing' : ''}`}>
        {children}
      </div>
    </div>
  );
};
