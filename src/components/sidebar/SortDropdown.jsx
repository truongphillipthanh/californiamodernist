// Sort Dropdown for sidebar header
// TASK-S013: Functional sort dropdown with A-Z, Status, Last Update, Total Days options
// TASK-S014: Added inversion styling when sort is active (not default)
//            Gold standard: stone-900 bg + white text when active

import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { key: 'name', label: 'A-Z', isDefault: true },
  { key: 'status', label: 'STATUS' },
  { key: 'lastUpdate', label: 'LAST UPDATE' },
  { key: 'totalDays', label: 'TOTAL DAYS' },
];

export default function SortDropdown({ sortKey, sortDirection, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (key) => {
    if (key === sortKey) {
      // Toggle direction
      onSortChange(key, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New option: default direction
      const defaultDir = key === 'name' ? 'asc' : 'desc';
      onSortChange(key, defaultDir);
    }
    setIsOpen(false);
  };

  const currentOption = SORT_OPTIONS.find(o => o.key === sortKey);
  // Sort is "active" (inverted) when not at default (name A-Z)
  const isActive = sortKey !== 'name' || sortDirection !== 'asc';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors
          ${isActive
            ? 'bg-stone-900 text-white'
            : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
          }
        `}
        title={`Sort by ${currentOption?.label || 'Sort'}`}
        aria-label="Sort projects"
      >
        <ArrowUpDown size={18} />
        {isActive && (
          <>
            <span className="text-xs font-medium">{currentOption?.label}</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-50">
          {SORT_OPTIONS.map(option => (
            <button
              key={option.key}
              onClick={() => handleOptionClick(option.key)}
              className={`
                w-full px-3 py-2 text-left text-sm flex items-center justify-between
                ${sortKey === option.key
                  ? 'bg-stone-100 text-stone-900 font-medium'
                  : 'text-stone-600 hover:bg-stone-50'
                }
              `}
            >
              <span>{option.label}</span>
              {sortKey === option.key && (
                <ChevronUp
                  size={16}
                  className={`text-stone-500 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
