import React from 'react';
import { Icon, iconName } from '../../Icon/Icon';
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

        <div className="card__actions">
          {isEditing ? (
            <>
              <button
                className="card__edit-button"
                onClick={handleSave}
              >
                <Icon
                  name="check"
                  className="card__edit-button-icon"
                />

                <span className="card__edit-button-text">
                  Save
                </span>
              </button>

              <button
                className="card__edit-button"
                onClick={handleCancel}
              >
                <Icon
                  name="close"
                  className="card__edit-button-icon"
                />

                <span className="card__edit-button-text">
                  Cancel
                </span>
              </button>
            </>
          ) : (
            <button
              className="card__edit-button"
              onClick={handleEdit}
            >
              <Icon
                name={icon}
                className="card__edit-button-icon"
              />

              <span className="card__edit-button-text">
                {iconTitle}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className={`card__grid ${isEditing ? 'card__grid_editing' : ''}`}>
        {children}
      </div>
    </div>
  );
};
