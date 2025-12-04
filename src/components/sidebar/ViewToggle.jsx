// View mode toggle for sidebar
// Style Guide Part VI, Section 6.2 - View Toggle Component
// TASK-021+022: Hamburger closes sidebar, Card/Photo switch views
// Icons: ☰ (closes sidebar) | ▤ (Card) | ▦ (Photo)

import { Menu, LayoutGrid, Image, ArrowUpDown } from 'lucide-react';

export default function ViewToggle({ activeView, onViewChange, onCloseSidebar }) {
  // Handle hamburger click - closes sidebar when in list view
  const handleHamburgerClick = () => {
    if (activeView === 'list') {
      onCloseSidebar?.();
    } else {
      onViewChange('list');
    }
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
        {/* Hamburger - closes sidebar or switches to list */}
        <button
          onClick={handleHamburgerClick}
          className={`
            flex items-center justify-center p-2 transition-colors
            ${activeView === 'list'
              ? 'bg-stone-200'
              : 'bg-white hover:bg-stone-100'
            }
          `}
          title={activeView === 'list' ? 'Close sidebar' : 'List view'}
          aria-label={activeView === 'list' ? 'Close sidebar' : 'List view'}
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
