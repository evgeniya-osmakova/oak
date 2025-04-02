import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon/Icon';
import './Sidebar.scss';

export const Sidebar = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setExpandedSection(null);
      }
    };

    if (expandedSection) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedSection]);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div
      className="sidebar__container"
      ref={sidebarRef}
    >
      <aside className="sidebar__main">
        <div className="sidebar__icons">
          <div className="sidebar__logo">
            <Icon name="logo" size={36} className="sidebar__logo-icon" />
          </div>

          <nav className="sidebar__nav">
            <div
              className={`sidebar__nav-icon ${expandedSection === 'organizations' ? 'sidebar__nav-icon_active' : ''}`}
              onClick={() => toggleSection('organizations')}
            >
              <Icon name="company" size={24} className="icon" />
            </div>

            <div
              className={`sidebar__nav-icon ${expandedSection === 'search' ? 'sidebar__nav-icon_active' : ''}`}
              onClick={() => toggleSection('search')}
            >
              <Icon name="search" size={24} className="icon" />
            </div>
          </nav>

          <div className="sidebar__bottom">
            <div
              className={`sidebar__nav-icon ${expandedSection === 'settings' ? 'sidebar__nav-icon_active' : ''}`}
              onClick={() => toggleSection('settings')}
            >
              <Icon name="settings" size={24} className="icon" />
            </div>

            <div
              className={`sidebar__nav-icon ${expandedSection === 'logout' ? 'sidebar__nav-icon_active' : ''}`}
              onClick={() => toggleSection('logout')}
            >
              <Icon name="exit" size={24} className="icon" />
            </div>
          </div>
        </div>
      </aside>

      {expandedSection && (
        <div className="sidebar__expanded">
          <div className="sidebar__header">
            <h2 className="sidebar__title">Oak Tree Cemetery</h2>
            <h3 className="sidebar__subtitle">Process Manager</h3>
          </div>

          {expandedSection === 'organizations' && (
            <nav className="sidebar__content">
              <div
                className="sidebar__nav-item sidebar__nav-item_filled"
                onClick={() => setExpandedSection(null)}
              >
                <Icon name="company" size={24} className="icon" />
                <span>Organizations</span>
              </div>

              <div
                className="sidebar__nav-item sidebar__nav-item_outlined"
                onClick={() => setExpandedSection(null)}
              >
                <Icon name="contractor" size={24} className="icon" />
                <span>Contractors</span>
              </div>

              <div
                className="sidebar__nav-item sidebar__nav-item_outlined"
                onClick={() => setExpandedSection(null)}
              >
                <Icon name="account" size={24} className="icon" />
                <span>Clients</span>
              </div>
            </nav>
          )}

          <div className="sidebar__copyright">
            All Funeral Services © 2015-2025
          </div>
        </div>
      )}
    </div>
  );
};
