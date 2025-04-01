import React, { useRef, useEffect } from 'react';
import { Icon } from '../../Icon/Icon';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string | string[];
  options: SelectOption[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  options,
  onChange,
  multiple,
  placeholder
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      onChange(newValues);
    } else {
      setSelectedValues([optionValue]);
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const displayValue = React.useMemo(() => {
    if (selectedValues.length === 0) {
      return placeholder || 'Select...';
    }
    
    return selectedValues
      .map(v => options.find(opt => opt.value === v)?.label)
      .filter(Boolean)
      .join(', ');
  }, [selectedValues, options, placeholder]);

  return (
    <div
      ref={selectRef}
      className={`select-container ${isOpen ? 'open' : ''}`}
    >
      <div 
        className="select-value" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayValue}</span>
        <Icon name="arrow-left" size={10} />
      </div>

      {isOpen && (
        <div className="select-options">
          {options.map(option => (
            <div
              key={option.value}
              className={`select-option ${
                selectedValues.includes(option.value) ? 'selected' : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {multiple && (
                <div className={`checkbox ${selectedValues.includes(option.value) ? 'checked' : ''}`}>
                  {selectedValues.includes(option.value) && (
                    <Icon name="check" size={10} />
                  )}
                </div>
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 