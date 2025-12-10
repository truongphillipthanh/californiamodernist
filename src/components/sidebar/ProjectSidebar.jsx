// TASK-041: Moved "Projects" label to footer for consistent hamburger position
import { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import ProjectList from './ProjectList';
import ProjectCards from './ProjectCards';
import ProjectPhotos from './ProjectPhotos';

export default function ProjectSidebar({
  projects = [],
  selectedProject,
  onSelectProject,
  onCloseSidebar,
  hoveredProjectId,
  onHoverProject,
}) {
  const [viewMode, setViewMode] = useState('list');

  const ViewComponent = {
    list: ProjectList,
    card: ProjectCards,
    photo: ProjectPhotos,
  }[viewMode];

  return (
    <div className="h-full flex flex-col">
      {/* TASK-041: Header with controls only - no title above */}
      <SidebarHeader
        activeView={viewMode}
        onViewChange={setViewMode}
        onCloseSidebar={onCloseSidebar}
      />

      {/* Scrollable project list */}
      <div className="flex-1 overflow-y-auto">
        {projects.length > 0 ? (
          <ViewComponent
            projects={projects}
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
