// Sort Dropdown for sidebar header
// TASK-S013: Functional sort dropdown with A-Z, Status, Last Update, Total Days options

import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronUp } from 'lucide-react';

const SORT_OPTIONS = [
  { key: 'name', label: 'A-Z' },
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

  const currentLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label || 'Sort';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-2 rounded-md border border-stone-200 bg-white hover:bg-stone-100 transition-colors"
        title={`Sort by ${currentLabel}`}
        aria-label="Sort projects"
      >
        <ArrowUpDown size={20} className="text-stone-600" />
        <ChevronUp
          size={14}
          className={`text-stone-500 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
        />
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
