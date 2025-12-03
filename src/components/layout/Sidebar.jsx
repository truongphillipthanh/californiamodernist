import { useEffect } from 'react';
import { X } from 'lucide-react';

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
      {/* Overlay - visible when sidebar is open on all screen sizes */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-40
          w-[380px] bg-white border-r border-stone-200
          transform transition-transform duration-250 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close button - visible on all screen sizes */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-md transition-colors z-10"
          aria-label="Close sidebar"
        >
          <X size={20} className="text-stone-500" />
        </button>

        {/* Sidebar content slot */}
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
}
