import React, { useState } from 'react';
import { Icon } from '../Icon/Icon';
import './Sidebar.scss';

export const Sidebar = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="sidebar-container">
      <aside className="sidebar">
        <div className="sidebar-icons">
          <div className="logo">
            <Icon name="logo" size={36} className="logo-icon" />
          </div>

          <nav className="nav-icons">
            <div
              className={`nav-icon ${expandedSection === 'organizations' ? 'active' : ''}`}
              onClick={() => toggleSection('organizations')}
            >
              <Icon name="company" size={24} className="icon" />
            </div>

            <div
              className={`nav-icon ${expandedSection === 'search' ? 'active' : ''}`}
              onClick={() => toggleSection('search')}
            >
              <Icon name="search" size={24} className="icon" />
            </div>
          </nav>

          <div className="bottom-icons">
            <div
              className={`nav-icon ${expandedSection === 'settings' ? 'active' : ''}`}
              onClick={() => toggleSection('settings')}
            >
              <Icon name="settings" size={24} className="icon" />
            </div>

            <div
              className={`nav-icon ${expandedSection === 'logout' ? 'active' : ''}`}
              onClick={() => toggleSection('logout')}
            >
              <Icon name="exit" size={24} className="icon" />
            </div>
          </div>
        </div>
      </aside>

      {expandedSection && (
        <div className="sidebar-expanded">
          <div className="expanded-header">
            <h1>Oak Tree Cemetery</h1>
            <h2>Process Manager</h2>
          </div>

          {expandedSection === 'organizations' && (
            <nav className="expanded-content">
              <div 
                className="nav-item nav-item__filled"
                onClick={() => setExpandedSection(null)}
              >
                <Icon name="company" size={24} className="icon" />
                <span>Organizations</span>
              </div>

              <div 
                className="nav-item nav-item__outlined"
                onClick={() => setExpandedSection(null)}
              >
                <Icon name="contractor" size={24} className="icon" />
                <span>Contractors</span>
              </div>

              <div 
                className="nav-item nav-item__outlined"
                onClick={() => setExpandedSection(null)}
              >
                <Icon name="account" size={24} className="icon" />
                <span>Clients</span>
              </div>
            </nav>
          )}

          <div className="copyright">
            All Funeral Services © 2015-2025
          </div>
        </div>
      )}
    </div>
  );
};
