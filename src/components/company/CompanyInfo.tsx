import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../../stores/CompanyStore';
import { COMPANY_ID, CONTACT_ID } from '../../constants/ids';
import { Icon } from '../common/Icon/Icon';
import { Details } from './CardComponents/Details'
import { Contacts } from './CardComponents/Contacts'
import { Photos } from './CardComponents/Photos'
import { EditNameModal } from './EditNameModal/EditNameModal'
import { IconButton } from '../../components/common/IconButton/IconButton';

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
      <div className="company__header">
        <IconButton
          iconName="arrow-left"
          iconSize={20}
          onClick={() => true}
        />

        <h1 className="company__title">{companyStore.company.name}</h1>

        <div className="company__actions">
          <IconButton
              iconName="edit"
              iconSize={20}
              onClick={() => setIsEditModalOpen(true)}
          />

          <IconButton
              iconName="delete"
              iconSize={20}
              onClick={() => true}
          />
        </div>
      </div>

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
