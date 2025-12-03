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
}) {
  const [viewMode, setViewMode] = useState('list');

  const ViewComponent = {
    list: ProjectList,
    card: ProjectCards,
    photo: ProjectPhotos,
  }[viewMode];

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader
        title="Projects"
        activeView={viewMode}
        onViewChange={setViewMode}
        onCloseSidebar={onCloseSidebar}
      />

      <div className="flex-1 overflow-y-auto">
        {projects.length > 0 ? (
          <ViewComponent
            projects={projects}
            selectedId={selectedProject?.id}
            onSelect={onSelectProject}
          />
        ) : (
          <div className="p-4 text-center text-stone-400 text-sm">
            No projects found
          </div>
        )}
      </div>
    </div>
  );
}
