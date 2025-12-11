// TASK-041: Moved "Projects" label to footer for consistent hamburger position
// TASK-S013: Sort state and logic
// TASK-S014: ViewMode now passed in as prop (lifted to MapPage for fixed-position toggle)
import { useState, useMemo } from 'react';
import SidebarHeader from './SidebarHeader';
import ProjectList from './ProjectList';
import ProjectCards from './ProjectCards';
import ProjectPhotos from './ProjectPhotos';

export default function ProjectSidebar({
  projects = [],
  selectedProject,
  onSelectProject,
  hoveredProjectId,
  onHoverProject,
  viewMode = 'list', // TASK-S014: Now passed from parent
}) {
  // TASK-S013: Sort state
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // TASK-S013: Sort logic
  const sortedProjects = useMemo(() => {
    const sorted = [...projects].sort((a, b) => {
      switch (sortKey) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');

        case 'status': {
          // Priority order: blocked (urgent) → waiting → active → complete
          const statusOrder = { blocked: 0, waiting: 1, active: 2, complete: 3, on_hold: 4, pending: 1 };
          return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
        }

        case 'lastUpdate': {
          // Most recent first (descending by default)
          const aDate = a.lastAction?.date ? new Date(a.lastAction.date) : new Date(0);
          const bDate = b.lastAction?.date ? new Date(b.lastAction.date) : new Date(0);
          return bDate - aDate;
        }

        case 'totalDays': {
          // Longest first (descending by default)
          const aDays = a.lastAction?.daysAgo ?? a.daysInPhase ?? 0;
          const bDays = b.lastAction?.daysAgo ?? b.daysInPhase ?? 0;
          return bDays - aDays;
        }

        default:
          return 0;
      }
    });

    return sortDirection === 'desc' ? sorted.reverse() : sorted;
  }, [projects, sortKey, sortDirection]);

  const handleSortChange = (key, direction) => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const ViewComponent = {
    list: ProjectList,
    card: ProjectCards,
    photo: ProjectPhotos,
  }[viewMode];

  return (
    <div className="h-full flex flex-col">
      {/* TASK-S014: Header with sort only - view toggle is fixed position overlay */}
      <SidebarHeader
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />

      {/* Scrollable project list */}
      <div className="flex-1 overflow-y-auto">
        {sortedProjects.length > 0 ? (
          <ViewComponent
            projects={sortedProjects}
            selectedId={selectedProject?.id}
            onSelect={onSelectProject}
            hoveredProjectId={hoveredProjectId}
            onHoverProject={onHoverProject}
          />
        ) : (
          <div className="p-4 text-center text-stone-400 text-sm">
            No projects found
          </div>
        )}
      </div>

      {/* TASK-058: Footer matches header height (72px) and typography */}
      <div className="h-[72px] px-6 border-t border-stone-200 flex items-center bg-white shrink-0">
        <span className="text-[15px] font-semibold tracking-[0.08em] uppercase text-stone-900">
          {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
        </span>
      </div>
    </div>
  );
}
