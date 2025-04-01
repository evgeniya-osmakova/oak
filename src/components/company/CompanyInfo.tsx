import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../../stores/CompanyStore';
import { COMPANY_ID, CONTACT_ID } from '../../constants/ids';
import { Icon } from '../Icon/Icon';
import { Details } from './CardComponents/Details'
import { Contacts } from './CardComponents/Contacts'
import { Photos } from './CardComponents/Photos'

import './CompanyInfo.scss';

export const CompanyInfo = observer(() => {
  useEffect(() => {
    companyStore.fetchCompanyData(COMPANY_ID, CONTACT_ID);
  }, []);

  if (companyStore.loading && (!companyStore.company || !companyStore.contact)) {
    return <div className="loading">Loading...</div>;
  }

  if (companyStore.error || !companyStore.company || !companyStore.contact) {
    return <div className="error">{companyStore.error || 'Data not found'}</div>;
  }

  return (
    <div className="company-info">
      <header className="company-header">
        <button className="back-button">
          <Icon name="arrow-left" size={20} />
        </button>

        <h1>{companyStore.company.name}</h1>

        <div className="header-actions">
          <button className="action-button">
            <Icon name="edit" size={20} />
          </button>
          <button className="action-button">
            <Icon name="delete" size={20} />
          </button>
        </div>
      </header>

      <Details />
      <Contacts />
      <Photos />
    </div>
  );
});
