// Sidebar layout component
// Style Guide Part VI - Sidebar slides in from left (360px width)
// TASK-021+022: Removed X button, close via hamburger in sidebar header or map click
// TASK-053: Updated top offset from 64px to 72px for taller header
// TASK-S010: Outer wrapper pointer-events-none, inner content pointer-events-auto
//            Allows map interactivity when sidebar is open

import { useEffect } from 'react';

export default function Sidebar({ isOpen, onClose, children }) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    // TASK-S010: Outer wrapper does NOT capture pointer events
    // This allows map to remain interactive when sidebar is open
    <div
      className={`
        fixed top-[72px] left-0 h-[calc(100vh-72px)] z-50
        pointer-events-none
        transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Sidebar content - DOES receive pointer events */}
      <aside
        className="w-[360px] h-full bg-white border-r border-stone-200 pointer-events-auto overflow-hidden flex flex-col"
      >
        {/* Sidebar content slot - hamburger in header closes sidebar */}
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </aside>
    </div>
  );
}
