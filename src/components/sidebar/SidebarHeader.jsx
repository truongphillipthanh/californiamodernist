import { ArrowUpDown } from 'lucide-react';
import ViewToggle from './ViewToggle';

export default function SidebarHeader({
  title = 'Projects',
  activeView,
  onViewChange,
  onCloseSidebar,
}) {
  return (
    <div className="p-4 border-b border-stone-200">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h2 className="text-lg font-semibold text-stone-900">{title}</h2>

        {/* Controls: View Toggle + Sort */}
        <div className="flex items-center gap-3">
          <ViewToggle
            activeView={activeView}
            onViewChange={onViewChange}
            onCloseSidebar={onCloseSidebar}
          />

          {/* Sort icon */}
          <button
            className="p-1.5 text-stone-500 hover:text-stone-700 transition-colors"
            aria-label="Sort projects"
          >
            <ArrowUpDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
