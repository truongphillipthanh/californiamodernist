import { Search } from 'lucide-react';
import ViewToggle from './ViewToggle';

export default function SidebarHeader({
  title = 'Projects',
  count = 0,
  activeView,
  onViewChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="p-4 border-b border-stone-200 space-y-3">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
          <p className="text-sm text-stone-500">{count} projects</p>
        </div>
        <ViewToggle activeView={activeView} onViewChange={onViewChange} />
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
        />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-stone-100 border-0 rounded-md text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1"
        />
      </div>
    </div>
  );
}
