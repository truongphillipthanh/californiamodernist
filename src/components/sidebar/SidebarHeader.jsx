// Sidebar header component
// Style Guide Part VI, Section 6.2
// TASK-021+022: Updated to pass onCloseSidebar to ViewToggle
// TASK-041: Removed "Projects" title - hamburger now at consistent position
// TASK-S013: Pass sort props to ViewToggle

import ViewToggle from './ViewToggle';

export default function SidebarHeader({
  activeView,
  onViewChange,
  onCloseSidebar,
  sortKey,
  sortDirection,
  onSortChange,
}) {
  return (
    <div className="p-4 border-b border-stone-200">
      {/* TASK-041: No title above controls - hamburger at consistent position */}
      <ViewToggle
        activeView={activeView}
        onViewChange={onViewChange}
        onCloseSidebar={onCloseSidebar}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
    </div>
  );
}
