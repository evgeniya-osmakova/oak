import React, { useRef, useEffect, useId } from 'react'
import { Icon } from '../../Icon/Icon';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string | string[];
  options: SelectOption[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isSelected = (value: string) => {
    return selectedValues.includes(value);
  };

  const selectId = useId();
  const listBoxId = `${selectId}-listBox`;

  return (
    <>
      <label
          className="select__label"
          htmlFor={selectId}
      >
        {label}
      </label>

      <div
        className={`select ${isOpen ? 'select_open' : ''}`}
        ref={selectRef}
      >
        <div
          id={selectId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listBoxId}
          tabIndex={0}
          className="select__value"
          onClick={toggleDropdown}
        >
          <span className="select__value-text">
            {displayValue}
          </span>

          <Icon
            name="arrow-left"
            className="select__value-icon"
          />
        </div>

        {isOpen && (
          <div
              role="listbox"
              id={listBoxId}
              className="select__options"
          >
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected(option.value)}
                className={`select__option ${isSelected(option.value) ? 'select__option_selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {multiple && (
                  <div className="select__checkbox">
                    {isSelected(option.value) && (
                      <Icon
                        name="check"
                        className="select__checkbox-icon"
                      />
                    )}
                  </div>
                )}

                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
