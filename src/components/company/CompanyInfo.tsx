import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../../stores/CompanyStore';
import { COMPANY_ID, CONTACT_ID } from '../../constants/ids';
import { Details } from './CardComponents/Details'
import { Contacts } from './CardComponents/Contacts'
import { Photos } from './CardComponents/Photos'
import { EditNameModal } from './EditNameModal/EditNameModal'
import { IconButton } from '../../components/common/IconButton/IconButton';
import { DeleteCompanyModal } from './DeleteCompanyModal/DeleteCompanyModal';

import './CompanyInfo.sass';

export const CompanyInfo = observer(() => {
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await companyStore.fetchCompanyData(COMPANY_ID, CONTACT_ID);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading && (!companyStore.company || !companyStore.contact)) {
    return <div className="company__loading">Loading...</div>;
  }

  if (!companyStore.company || !companyStore.contact) {
    return <div className="company__error">{'Data not found'}</div>;
  }

  const handleSaveName = async (newName: string) => {
    try {
      setIsSaving(true);
      setEditError(null);

      await companyStore.updateCompany({
        name: newName
      });

      setIsEditModalOpen(false);
    } catch {
      setEditError('Failed to update company name');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    setEditError(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteError(null);

      await companyStore.deleteCompany();
    } catch {
      setDeleteError('Failed to delete organization. Please try again.');
    } finally {
      setIsDeleting(false);
    }
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
            onClick={() => setIsDeleteModalOpen(true)}
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

      <DeleteCompanyModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        error={deleteError}
      />
    </div>
  );
});
