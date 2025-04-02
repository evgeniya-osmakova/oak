import React, { useState, useRef, useEffect } from 'react';
import { Icon, iconName } from '../common/Icon/Icon'
import { Button } from '../common/Button/Button'

import './Sidebar.sass';

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
      document.addEventListener('pointerdown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [expandedSection]);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const renderIcon = (name: iconName) => {
    return (
      <div
          className={`sidebar__nav-icon ${expandedSection === name ? 'sidebar__nav-icon_active' : ''}`}
          onClick={() => toggleSection(name)}
          aria-label={name}
          role="button"
          tabIndex={0}
      >
        <Icon
            name={name}
            size={20}
            className="icon"
        />
      </div>
    )
  }

  return (
    <div
      className="sidebar__container"
      ref={sidebarRef}
    >
      <aside className="sidebar__main">
        <nav className="sidebar__icons">
          <div className="sidebar__logo">
            <Icon name="logo" size={36} className="sidebar__logo-icon" />
          </div>

          <div className="sidebar__top">
            {renderIcon('organizations')}
            {renderIcon('search')}
          </div>

          <div className="sidebar__bottom">
            {renderIcon('settings')}
            {renderIcon('exit')}
          </div>
        </nav>
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
                  iconName="organizations"
                  iconSize={16}
                  largeButton
              >
                Organizations
              </Button>

              <Button
                  variant="outline"
                  onClick={() => setExpandedSection(null)}
                  iconName="contractor"
                  iconSize={16}
                  largeButton
              >
                Contractors
              </Button>

              <Button
                  variant="outline"
                  onClick={() => setExpandedSection(null)}
                  iconName="account"
                  iconSize={16}
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
