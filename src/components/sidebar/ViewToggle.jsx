// View mode toggle for sidebar
// Style Guide Part VI, Section 6.2 - View Toggle Component
// TASK-036: Hamburger ALWAYS closes sidebar (unified hamburger pattern)
// TASK-S013: Integrated SortDropdown component
// Icons: ☰ (closes sidebar) | ▤ (Card) | ▦ (Photo)

import { Menu, LayoutGrid, Image } from 'lucide-react';
import SortDropdown from './SortDropdown';

export default function ViewToggle({
  activeView,
  onViewChange,
  onCloseSidebar,
  sortKey,
  sortDirection,
  onSortChange,
}) {
  // Handle hamburger click - ALWAYS closes sidebar (TASK-036)
  const handleHamburgerClick = () => {
    onCloseSidebar?.();
  };

  // Handle Card/Photo click - toggle or switch view
  const handleViewClick = (viewId) => {
    if (activeView === viewId) {
      // Clicking active Card/Photo reverts to List
      onViewChange('list');
    } else {
      onViewChange(viewId);
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-3">
      {/* View toggle pill group - ☰ | ▤ | ▦ */}
      <div className="inline-flex rounded-md overflow-hidden border border-stone-200">
        {/* Hamburger - ALWAYS closes sidebar (TASK-036 unified hamburger) */}
        <button
          onClick={handleHamburgerClick}
          className="flex items-center justify-center p-2 transition-colors bg-white hover:bg-stone-100"
          title="Close sidebar"
          aria-label="Close sidebar"
        >
          <Menu size={20} className="text-stone-600" />
        </button>

        {/* Card view */}
        <button
          onClick={() => handleViewClick('card')}
          className={`
            flex items-center justify-center p-2 transition-colors border-l border-stone-200
            ${activeView === 'card'
              ? 'bg-stone-200'
              : 'bg-white hover:bg-stone-100'
            }
          `}
          title="Card view"
          aria-label="Card view"
        >
          <LayoutGrid size={20} className="text-stone-600" />
        </button>

        {/* Photo view */}
        <button
          onClick={() => handleViewClick('photo')}
          className={`
            flex items-center justify-center p-2 transition-colors border-l border-stone-200
            ${activeView === 'photo'
              ? 'bg-stone-200'
              : 'bg-white hover:bg-stone-100'
            }
          `}
          title="Photo view"
          aria-label="Photo view"
        >
          <Image size={20} className="text-stone-600" />
        </button>
      </div>

      {/* TASK-S013: Functional sort dropdown */}
      <SortDropdown
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
    </div>
  );
}
