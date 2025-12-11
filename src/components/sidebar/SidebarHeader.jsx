// Sidebar header component
// Style Guide Part VI, Section 6.2
// TASK-S014: Header now only contains SortDropdown (right-aligned)
//            ViewToggle is now a fixed-position element in MapPage

import SortDropdown from './SortDropdown';

export default function SidebarHeader({
  sortKey,
  sortDirection,
  onSortChange,
}) {
  return (
    <div className="h-14 flex items-center justify-end px-4 border-b border-stone-200">
      {/* TASK-S014: Left side spacer for where ViewToggle floats above */}
      <div className="w-[130px]" />

      {/* TASK-S014: Sort dropdown - right aligned */}
      <SortDropdown
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
    </div>
  );
}
