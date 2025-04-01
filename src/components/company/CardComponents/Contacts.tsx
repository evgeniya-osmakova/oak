import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../Card/Card';
import { Input } from '../../common/Input/Input';
import { companyStore } from '../../../stores/CompanyStore';
import './CardComponents.scss';

interface EditedData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}

export const Contacts = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<EditedData>({
    firstname: '',
    lastname: '',
    phone: '',
    email: ''
  });

  const contact = companyStore.contact;

  const handleEdit = () => {
    if (contact) {
      setEditedData({
        firstname: contact.firstname || '',
        lastname: contact.lastname || '',
        phone: contact.phone || '',
        email: contact.email || ''
      });
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    if (contact) {
      companyStore.updateContact({
        ...contact,
        ...editedData
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

  if (!contact) return null;

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
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Responsible person:</span>

          {isEditing ? (
            <div className="input-row">
              <Input
                value={editedData.firstname}
                onValueChange={handleChange('firstname')}
                placeholder="First name"
              />
              <Input
                value={editedData.lastname}
                onValueChange={handleChange('lastname')}
                placeholder="Last name"
              />
            </div>
          ) : (
            <span className="value">{contact.firstname} {contact.lastname}</span>
          )}
        </div>

        <div className="detail-item">
          <span className="label">Phone number:</span>
          {isEditing ? (
            <Input
              value={editedData.phone}
              onValueChange={handleChange('phone')}
            />
          ) : (
            <span className="value">{contact.phone}</span>
          )}
        </div>

        <div className="detail-item">
          <span className="label">E-mail:</span>

          {isEditing ? (
            <Input
              value={editedData.email}
              onValueChange={handleChange('email')}
            />
          ) : (
            <span className="value">{contact.email}</span>
          )}
        </div>
      </div>
    </Card>
  );
});
