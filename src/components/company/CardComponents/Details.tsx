import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../Card/Card';
import { Input } from '../../common/Input/Input';
import { Select } from '../../common/Select/Select';
import { companyStore } from '../../../stores/CompanyStore';

import './EditableContent.scss';

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

  const handleSave = async () => {
    if (company) {
      // Parse the date from DD.MM.YYYY to ISO format
      const [day, month, year] = editedData.contract.issue_date.split('.');
      const isoDate = day && month && year ? `${year}-${month}-${day}T00:00:00Z` : '';

      await companyStore.updateCompany({
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

  if (!company) {
    return null;
  }

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
      <div className="content__item">
        {isEditing ? (
          <div className="content__input-row">
            <div className="content__input-block">
              <Input
                label="Agreement number:"
                smallInput
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

            <div className="content__input-block">
              <Input
                label="Date:"
                smallInput
                smallLabel
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
            <span className="content__label">
              Agreement:
            </span>

            <div className="content__value">
              <span>
                {company.contract?.no || 'N/A'}
              </span>

              <span className="content__value-divider">
                /
              </span>

              <span>
                {formatDisplayDate(company.contract?.issue_date)}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="content__item">
        {isEditing ? (
          <Select
            label="Business entity:"
            value={editedData.businessEntity}
            options={BUSINESS_ENTITY_OPTIONS}
            onChange={handleBusinessEntityChange}
          />
        ) : (
          <>
            <span className="content__label">
              Business entity:
            </span>

            <span className="content__value">
              {company.businessEntity}
            </span>
          </>
        )}
      </div>

      <div className="content__item">
        {isEditing ? (
          <Select
            label="Company type:"
            value={editedData.type}
            options={COMPANY_TYPE_OPTIONS}
            onChange={handleTypeChange}
            multiple
          />
        ) : (
            <>
              <span className="content__label">
                Company type:
              </span>

              <span className="content__value">
                {company.type.join(', ')}
              </span>
            </>
        )}
      </div>
    </Card>
  );
});
