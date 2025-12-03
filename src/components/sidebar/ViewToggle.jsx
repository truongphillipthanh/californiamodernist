// View mode toggle for sidebar
// Style Guide Part VI, Section 6.2 - View Toggle Component
// TASK-016: Fixed icon sizes (20px), pill group styling, always-visible views

import { Menu, Grid2x2, Image, ArrowUpDown } from 'lucide-react';

const views = [
  { id: 'list', icon: Menu, label: 'List' },
  { id: 'card', icon: Grid2x2, label: 'Card' },
  { id: 'photo', icon: Image, label: 'Photo' },
];

export default function ViewToggle({ activeView, onViewChange }) {
  return (
    <div className="flex items-center justify-between w-full gap-3">
      {/* View toggle pill group - all 3 views always visible */}
      <div className="inline-flex rounded-md overflow-hidden border border-stone-200">
        {views.map(({ id, icon: Icon, label }, index) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`
              flex items-center justify-center p-2 transition-colors
              ${activeView === id
                ? 'bg-stone-200'
                : 'bg-white hover:bg-stone-100'
              }
              ${index > 0 ? 'border-l border-stone-200' : ''}
            `}
            title={label}
            aria-label={`${label} view`}
          >
            <Icon size={20} className="text-stone-600" />
          </button>
        ))}
      </div>

      {/* Sort button - separate, right-aligned */}
      <button
        className="flex items-center justify-center p-2 rounded-md border border-stone-200 bg-white hover:bg-stone-100 transition-colors"
        title="Sort"
        aria-label="Sort projects"
      >
        <ArrowUpDown size={20} className="text-stone-600" />
      </button>
    </div>
  );
}
