// FilterDropdown - Reusable dropdown component for filters
// Style Guide Part II (Stone palette) and Part VII (Interactions)

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.id === value);
  const displayLabel = selectedOption?.label || label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors
          ${isOpen
            ? 'bg-stone-200 border-stone-300'
            : 'bg-stone-100 border-stone-200 hover:bg-stone-150'
          }
        `}
      >
        <span className="text-stone-600">{displayLabel}</span>
        <ChevronDown
          size={14}
          className={`text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-xl border border-stone-200 py-1 min-w-[180px] z-30">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-3 py-2 text-[13px] transition-colors
                ${value === option.id
                  ? 'bg-stone-100 text-stone-900 font-medium'
                  : 'text-stone-600 hover:bg-stone-50'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
