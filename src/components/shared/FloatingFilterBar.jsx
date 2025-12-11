// TASK-C005: Shared FloatingFilterBar component for design consistency
// Used by Map page and CRM page for consistent filter UI
// Style Guide Part II (Stone palette), Part VII (Interactions)
// TASK-S014: Added inversion styling when filter is active (not 'all')
//            Gold standard: stone-900 bg + white text when active

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FloatingFilterBar({ filters, className = '' }) {
  return (
    <div className={`
      inline-flex items-center gap-1
      bg-white
      border border-stone-200
      rounded-lg
      shadow-sm
      p-1
      ${className}
    `}>
      {filters.map((filter) => (
        <FilterPill
          key={filter.id}
          {...filter}
        />
      ))}
    </div>
  );
}

function FilterPill({ id, label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filter is "active" when not at default ('all')
  const isActive = value && value !== 'all';

  // Display label: show selected value or default label
  const selectedOption = options?.find(o => o.value === value);
  const displayLabel = isActive
    ? selectedOption?.label || label
    : label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5
          px-3 py-1.5
          text-sm
          rounded-md
          transition-colors duration-100
          ${isActive
            ? 'bg-stone-900 text-white'
            : 'text-stone-700 hover:bg-stone-100'
          }
        `}
      >
        <span className="font-medium">
          {displayLabel}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''} ${isActive ? 'text-white' : 'text-stone-400'}`}
        />
      </button>

      {isOpen && (
        <div className="
          absolute top-full left-0 mt-1 z-50
          min-w-[180px]
          bg-white
          border border-stone-200
          rounded-lg
          shadow-lg
          py-1
          overflow-hidden
        ">
          {options?.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-3 py-2 text-left text-sm
                hover:bg-stone-50 transition-colors
                flex items-center justify-between
                ${value === option.value ? 'bg-stone-100 font-medium text-stone-900' : 'text-stone-600'}
              `}
            >
              <span>{option.label}</span>
              {option.count !== undefined && (
                <span className="text-stone-400 text-xs">{option.count}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
