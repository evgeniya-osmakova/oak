import React from 'react';
import { Modal } from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';

import './DeleteCompanyModal.sass';

interface DeleteCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const DeleteCompanyModal: React.FC<DeleteCompanyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  error
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Remove the Organization?"
    >
      <div className="delete-company-modal">
        <p className="delete-company-modal__text">
          Are you sure you want to remove this Organization?
        </p>

        <div className="delete-company-modal__buttons">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            No
          </Button>

          <Button
            variant="filled"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Yes, remove
          </Button>
        </div>

        {error && (
            <p className="delete-company-modal__error">{error}</p>
        )}
      </div>
    </Modal>
  );
};
