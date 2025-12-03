// Sidebar header component
// Style Guide Part VI, Section 6.2
// TASK-016: Updated to use new ViewToggle with integrated sort

import ViewToggle from './ViewToggle';

export default function SidebarHeader({
  title = 'Projects',
  activeView,
  onViewChange,
}) {
  return (
    <div className="p-4 border-b border-stone-200">
      {/* Title */}
      <h2 className="text-lg font-semibold text-stone-900 mb-3">{title}</h2>

      {/* View Toggle with integrated Sort button */}
      <ViewToggle
        activeView={activeView}
        onViewChange={onViewChange}
      />
    </div>
  );
}
