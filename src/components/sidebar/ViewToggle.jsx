import { List, LayoutGrid, Image } from 'lucide-react';

const views = [
  { id: 'list', icon: List, label: 'List' },
  { id: 'card', icon: LayoutGrid, label: 'Card' },
  { id: 'photo', icon: Image, label: 'Photo' },
];

export default function ViewToggle({ activeView, onViewChange }) {
  return (
    <div className="flex items-center bg-stone-100 rounded-md p-0.5">
      {views.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`
            flex items-center justify-center p-1.5 rounded transition-colors
            ${activeView === id
              ? 'bg-white shadow-sm text-stone-900'
              : 'text-stone-500 hover:text-stone-700'
            }
          `}
          title={label}
          aria-label={`${label} view`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
