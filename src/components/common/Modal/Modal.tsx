import React, { useEffect, useId } from 'react'
import { createPortal } from 'react-dom';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const titleId = useId();

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="modal">
      <div
          className="modal__overlay"
          onClick={onClose}
      >
        <div
          className="modal__content"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId: undefined}
        >
          {title && (
            <div className="modal__header">
              <h2
                id={titleId}
                className="modal__title"
              >
                {title}
              </h2>
            </div>
          )}
          <div className="modal__body">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
