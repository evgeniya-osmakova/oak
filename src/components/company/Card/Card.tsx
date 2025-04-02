import React, { useState } from 'react'
import { iconName } from '../../common/Icon/Icon';
import { Button } from '../../common/Button/Button'

import './Card.sass';

interface CardProps {
  title: string;
  icon: iconName;
  iconTitle: string;
  children: React.ReactNode;
  onClick: () => void;
  isEditing?: boolean;
  onSave?: () => Promise<void>;
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
  const [loading, setLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const handleEdit = () => {
    onClick();
  };

  const handleSave = async () => {
    if (!onSave) {
      return;
    }

    try {
      setLoading(true);
      setEditError(null);
      await onSave();
    } catch {
      setEditError('Failed to update data')
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }

    setEditError(null);
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">
          {title}
        </h2>

        {editError && (
            <p className="card__error">{editError}</p>
        )}

        {isEditing ? (
          <div className="card__actions">
            <Button
                variant="flattened"
                onClick={handleSave}
                iconName="check"
                iconSize={16}
                disabled={loading}
            >
              Save changes
            </Button>

            <Button
                variant="flattened"
                onClick={handleCancel}
                iconName="close"
                iconSize={16}
                disabled={loading}
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
                disabled={loading}
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
