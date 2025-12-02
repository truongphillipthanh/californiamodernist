import { X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose, children }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-40
          w-[380px] bg-white border-r border-stone-200
          transform transition-transform duration-300 ease-out-expo
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-md lg:hidden"
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
