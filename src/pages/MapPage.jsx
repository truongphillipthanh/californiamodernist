import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/map/Map';
import ProjectSidebar from '../components/sidebar/ProjectSidebar';
import { getProjects, getMapMarkers } from '../lib/api';

export default function MapPage() {
  const [projects, setProjects] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getProjects(), getMapMarkers()]).then(([projectsData, markersData]) => {
      setProjects(projectsData);
      setMarkers(markersData);
    });
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // Could also fly map to project location here
  };

  const handleProjectNavigate = (project) => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="h-[calc(100vh-64px)] relative flex">
      {/* Sidebar */}
      <div className="w-[380px] border-r border-stone-200 bg-white shrink-0 hidden lg:block">
        <ProjectSidebar
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={handleProjectSelect}
        />
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <Map
          markers={markers}
          onProjectSelect={handleProjectNavigate}
        />
      </div>
    </div>
  );
}
