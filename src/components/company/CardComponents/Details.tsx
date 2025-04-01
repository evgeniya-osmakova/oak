import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../Card/Card';
import { Input } from '../../common/Input/Input';
import { Select } from '../../common/Select/Select';
import { companyStore } from '../../../stores/CompanyStore';

import './CardComponents.scss';

const BUSINESS_ENTITY_OPTIONS = [
  { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Limited Liability Company', label: 'Limited Liability Company' }
];

const COMPANY_TYPE_OPTIONS = [
  { value: 'funeral_home', label: 'Funeral Home' },
  { value: 'logistics_services', label: 'Logistics services' },
  { value: 'burial_care_contractor', label: 'Burial care Contractor' }
];

interface EditedData {
  name: string;
  shortName: string;
  contract: {
    no: string;
    issue_date: string;
  };
  businessEntity: string;
  type: string[];
}

export const Details = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<EditedData>({
    name: '',
    shortName: '',
    contract: {
      no: '',
      issue_date: ''
    },
    businessEntity: '',
    type: []
  });

  const company = companyStore.company;

  const handleEdit = () => {
    if (company) {
      const date = company.contract?.issue_date ? new Date(company.contract.issue_date) : null;
      setEditedData({
        name: company.name,
        shortName: company.shortName,
        contract: {
          no: company.contract?.no || '',
          issue_date: date ? date.toLocaleDateString('ru-RU') : ''
        },
        businessEntity: company.businessEntity || '',
        type: company.type || []
      });
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    if (company) {
      // Parse the date from DD.MM.YYYY to ISO format
      const [day, month, year] = editedData.contract.issue_date.split('.');
      const isoDate = `${year}-${month}-${day}T00:00:00Z`;

      companyStore.updateCompany({
        name: editedData.name,
        shortName: editedData.shortName,
        contract: {
          no: editedData.contract.no,
          issue_date: isoDate
        },
        businessEntity: editedData.businessEntity,
        type: editedData.type
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const handleBusinessEntityChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setEditedData(prev => ({
        ...prev,
        businessEntity: value
      }));
    }
  };

  const handleTypeChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setEditedData(prev => ({
        ...prev,
        type: value
      }));
    }
  };

  if (!company) return null;

  return (
    <Card
      title="Company Details"
      icon="edit"
      iconTitle="Edit"
      onClick={handleEdit}
      isEditing={isEditing}
      onSave={handleSave}
      onCancel={handleCancel}
    >
      <div className="details-grid">
        <div className="detail-item">
          {isEditing ? (
            <div className="input-row">
              <div className="input-block">
                <span className="label">Agreement number:</span>

                <Input
                    small
                    value={editedData.contract.no}
                    onValueChange={(value) => setEditedData(prev => ({
                      ...prev,
                      contract: {
                        ...prev.contract,
                        no: value
                      }
                    }))}
                />
              </div>

              <div className="input-block">
                <span className="label label__small">Date:</span>
                <Input
                  small
                  value={editedData.contract.issue_date}
                  onValueChange={(value) => setEditedData(prev => ({
                    ...prev,
                    contract: {
                      ...prev.contract,
                      issue_date: value
                    }
                  }))}
                />
              </div>
            </div>
          ) : (
            <>
              <span className="label">Agreement:</span>

              <div className="value">
                <span>{company.contract?.no || 'N/A'}</span>
                <span className="divider">/</span>
                <span>{formatDisplayDate(company.contract?.issue_date)}</span>
              </div>
            </>
          )}
        </div>

        <div className="detail-item">
          <span className="label">Business entity:</span>
          {isEditing ? (
            <Select
              value={editedData.businessEntity}
              options={BUSINESS_ENTITY_OPTIONS}
              onChange={handleBusinessEntityChange}
            />
          ) : (
            <span className="value">{company.businessEntity}</span>
          )}
        </div>

        <div className="detail-item">
          <span className="label">Company type:</span>
          {isEditing ? (
            <Select
              value={editedData.type}
              options={COMPANY_TYPE_OPTIONS}
              onChange={handleTypeChange}
              multiple
            />
          ) : (
            <span className="value">{company.type.join(', ')}</span>
          )}
        </div>
      </div>
    </Card>
  );
});
