import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../Card/Card';
import { Input } from '../../common/Input/Input';
import { companyStore } from '../../../stores/CompanyStore';

import './EditableContent.sass';

interface EditedData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  fullName: string;
}

export const Contacts = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<EditedData>({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    fullName: '',
  });

  const contact = companyStore.contact;

  const handleEdit = () => {
    if (contact) {
      setEditedData({
        firstname: contact.firstname || '',
        lastname: contact.lastname || '',
        phone: contact.phone || '',
        email: contact.email || '',
        fullName: `${contact.firstname} ${contact.lastname}`,
      });
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (contact) {
      const [firstname, lastname] = editedData.fullName.trim().split(' ');

      await companyStore.updateContact({
        ...contact,
        firstname: firstname || '',
        lastname: lastname || '',
        phone: editedData.phone || '',
        email: editedData.email || '',
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field: keyof EditedData) => (value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!contact) {
    return null
  }

  return (
    <Card
      title="Contact Details"
      icon="edit"
      iconTitle="Edit"
      onClick={handleEdit}
      isEditing={isEditing}
      onSave={handleSave}
      onCancel={handleCancel}
    >
      <div className="content__item">
        {isEditing ? (
          <Input
            label="Responsible person:"
            value={editedData.fullName}
            onValueChange={handleChange('fullName')}
            placeholder="Full name"
          />
        ) : (
          <>
            <span className="content__label">
              Responsible person:
            </span>

            <span className="content__value">
              {contact.firstname} {contact.lastname}
            </span>
          </>
        )}
      </div>

      <div className="content__item">
        {isEditing ? (
          <Input
            label="Phone number:"
            type="tel"
            autoComplete="tel"
            value={editedData.phone}
            onValueChange={handleChange('phone')}
          />
        ) : (
          <>
            <span className="content__label">
              Phone number:
            </span>

            <span className="content__value">
              {contact.phone}
            </span>
          </>
        )}
      </div>

      <div className="content__item">
        {isEditing ? (
          <Input
            label="E-mail:"
            type="email"
            autoComplete="email"
            value={editedData.email}
            onValueChange={handleChange('email')}
          />
        ) : (
          <>
            <span className="content__label">
              E-mail:
            </span>

            <span className="content__value">
              {contact.email}
            </span>
          </>
        )}
      </div>
    </Card>
  );
});
