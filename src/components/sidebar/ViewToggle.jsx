// View mode toggle for sidebar
// Style Guide Part VI, Section 6.2 - View Toggle Component
// TASK-S014: Fixed-position view mode toggle with proper inversion
// Icons: ☰ (List - toggles sidebar) | ▤ (Card) | ▦ (Photo)
// Gold standard: LayerToggle/ZoomLevelPills inversion pattern (stone-900 bg + white text when active)

import { Menu, LayoutGrid, Image } from 'lucide-react';

export default function ViewToggle({
  activeView,
  sidebarOpen,
  onViewChange,
  onToggleSidebar,
}) {
  // Handle view mode click
  const handleModeClick = (mode) => {
    if (mode === 'list') {
      // List mode - hamburger toggles sidebar open/closed
      onToggleSidebar?.();
      if (!sidebarOpen) {
        onViewChange('list');
      }
    } else {
      // Card/Photo mode
      if (activeView === mode && sidebarOpen) {
        // Clicking active Card/Photo when sidebar is open → do nothing (B1 fix)
        return;
      }
      // Switch to new mode and ensure sidebar is open
      onViewChange(mode);
      if (!sidebarOpen) {
        onToggleSidebar?.();
      }
    }
  };

  const modes = [
    { id: 'list', icon: Menu, label: 'List View' },
    { id: 'card', icon: LayoutGrid, label: 'Card View' },
    { id: 'photo', icon: Image, label: 'Photo View' },
  ];

  return (
    <div className="inline-flex items-center gap-0 bg-white rounded-lg shadow-lg border border-stone-200 p-1">
      {modes.map(({ id, icon: Icon, label }) => {
        // List is "active" when sidebar is open AND view is list
        // Card/Photo are "active" when sidebar is open AND view matches
        const isActive = sidebarOpen && activeView === id;

        return (
          <button
            key={id}
            onClick={() => handleModeClick(id)}
            title={label}
            className={`
              p-2.5 rounded-md transition-colors duration-100
              ${isActive
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
              }
            `}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}
