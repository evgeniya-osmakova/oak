import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../common/Icon/Icon';
import './Sidebar.scss';
import { Button } from '../common/Button/Button'

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
              <Button
                  variant="filled"
                  onClick={() => setExpandedSection(null)}
                  iconName="company"
                  iconSize={24}
                  largeButton
              >
                Organizations
              </Button>

              <Button
                  variant="outline"
                  onClick={() => setExpandedSection(null)}
                  iconName="contractor"
                  iconSize={24}
                  largeButton
              >
                Contractors
              </Button>

              <Button
                  variant="outline"
                  onClick={() => setExpandedSection(null)}
                  iconName="account"
                  iconSize={24}
                  largeButton
              >
                Clients
              </Button>
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
