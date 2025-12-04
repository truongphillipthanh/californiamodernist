// View mode toggle for sidebar
// Style Guide Part VI, Section 6.2 - View Toggle Component
// TASK-028: Removed hamburger from ViewToggle - now fixed floating button handles open/close
// Icons: ▢ (List) | ▤ (Card) | ▦ (Photo)

import { List, LayoutGrid, Image, ArrowUpDown } from 'lucide-react';

export default function ViewToggle({ activeView, onViewChange }) {
  return (
    <div className="flex items-center justify-between w-full gap-3">
      {/* View toggle pill group - ▢ | ▤ | ▦ */}
      <div className="inline-flex rounded-md overflow-hidden border border-stone-200">
        {/* List view */}
        <button
          onClick={() => onViewChange('list')}
          className={`
            flex items-center justify-center p-2 transition-colors
            ${activeView === 'list'
              ? 'bg-stone-200'
              : 'bg-white hover:bg-stone-100'
            }
          `}
          title="List view"
          aria-label="List view"
        >
          <List size={20} className="text-stone-600" />
        </button>

        {/* Card view */}
        <button
          onClick={() => onViewChange('card')}
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
          onClick={() => onViewChange('photo')}
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
