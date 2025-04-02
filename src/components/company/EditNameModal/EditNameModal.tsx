import React, { useState, useEffect } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';
import './EditNameModal.scss';

interface EditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName: string;
  isSaving: boolean;
  error?: string | null;
}

export const EditNameModal: React.FC<EditNameModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName,
  isSaving,
  error
}) => {
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEditedName(initialName);
    }
  }, [isOpen, initialName]);

  const handleSave = () => {
    onSave(editedName.trim());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Organization's name"
    >
      <div className="edit-name">
        <input
          type="text"
          className="edit-name__input"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="Enter organization name"
          disabled={isSaving}
        />

        <div className="edit-name__actions">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>

          <Button
            variant="filled"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>

        {error && (
            <p className="edit-name__error">{error}</p>
        )}
      </div>
    </Modal>
  );
};
