import { useState, useMemo } from 'react';
import SidebarHeader from './SidebarHeader';
import ProjectList from './ProjectList';
import ProjectCards from './ProjectCards';
import ProjectPhotos from './ProjectPhotos';

export default function ProjectSidebar({
  projects = [],
  selectedProject,
  onSelectProject,
}) {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects by search
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.parcel?.address?.toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);

  const ViewComponent = {
    list: ProjectList,
    card: ProjectCards,
    photo: ProjectPhotos,
  }[viewMode];

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader
        title="Projects"
        count={filteredProjects.length}
        activeView={viewMode}
        onViewChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 overflow-y-auto">
        {filteredProjects.length > 0 ? (
          <ViewComponent
            projects={filteredProjects}
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
