import { useState } from 'react';
import { Menu, LayoutGrid, Image } from 'lucide-react';

const views = [
  { id: 'list', icon: Menu, label: 'List' },
  { id: 'card', icon: LayoutGrid, label: 'Card' },
  { id: 'photo', icon: Image, label: 'Photo' },
];

export default function ViewToggle({ activeView, onViewChange, onCloseSidebar }) {
  const [expanded, setExpanded] = useState(false);

  const handleViewClick = (viewId) => {
    if (viewId === 'list') {
      // If already in list view, close the sidebar
      if (activeView === 'list') {
        onCloseSidebar?.();
      } else {
        // Switch to list view
        onViewChange('list');
      }
      setExpanded(false);
    } else {
      // For card/photo, just switch the view
      onViewChange(viewId);
      setExpanded(false);
    }
  };

  const handleMenuClick = () => {
    if (activeView === 'list') {
      // In list view, clicking menu toggles expansion
      setExpanded(!expanded);
    } else {
      // In card/photo view, clicking menu switches to list view
      onViewChange('list');
      setExpanded(false);
    }
  };

  // Show just the menu icon if collapsed, or all views if expanded
  const visibleViews = expanded ? views : [views[0]];

  return (
    <div className="flex items-center bg-stone-100 rounded-md p-0.5">
      {visibleViews.map(({ id, icon: Icon, label }, index) => (
        <button
          key={id}
          onClick={() => index === 0 ? handleMenuClick() : handleViewClick(id)}
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
