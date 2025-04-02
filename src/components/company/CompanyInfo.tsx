import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../../stores/CompanyStore';
import { COMPANY_ID, CONTACT_ID } from '../../constants/ids';
import { Icon } from '../common/Icon/Icon';
import { Details } from './CardComponents/Details'
import { Contacts } from './CardComponents/Contacts'
import { Photos } from './CardComponents/Photos'
import { EditNameModal } from './EditNameModal/EditNameModal'

import './CompanyInfo.scss';

export const CompanyInfo = observer(() => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    companyStore.fetchCompanyData(COMPANY_ID, CONTACT_ID);
  }, []);

  if (companyStore.loading && (!companyStore.company || !companyStore.contact)) {
    return <div className="company__loading">Loading...</div>;
  }

  if (companyStore.error || !companyStore.company || !companyStore.contact) {
    return <div className="company__error">{companyStore.error || 'Data not found'}</div>;
  }

  const handleSaveName = async (newName: string) => {
    try {
      setIsSaving(true);
      setEditError(null);
      await companyStore.updateCompany({
        ...companyStore.company,
        name: newName
      });
      setIsEditModalOpen(false);
    } catch (error) {
      setEditError(companyStore.error || 'Failed to update company name');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    setEditError(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="company__info">
      <header className="company__header">
        <button className="company__back-button">
          <Icon name="arrow-left" size={20} />
        </button>

        <h1 className="company__title">{companyStore.company.name}</h1>

        <div className="company__actions">
          <button
            className="company__action-button"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Icon name="edit" size={20} />
          </button>
          <button className="company__action-button">
            <Icon name="delete" size={20} />
          </button>
        </div>
      </header>

      <Details />
      <Contacts />
      <Photos />

      <EditNameModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveName}
        initialName={companyStore.company.name}
        isSaving={isSaving}
        error={editError}
      />
    </div>
  );
});
