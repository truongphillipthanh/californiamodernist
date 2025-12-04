// Sidebar layout component
// Style Guide Part VI - Sidebar slides in from left (360px width)
// TASK-021+022: Removed X button, close via hamburger in sidebar header or map click

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
    <>
      {/* Overlay - clicking outside sidebar (on map) closes sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel - 360px per Style Guide */}
      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-50
          w-[360px] bg-white border-r border-stone-200
          transform transition-transform duration-250 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar content slot - hamburger in header closes sidebar */}
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
}
