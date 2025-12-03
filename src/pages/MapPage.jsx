import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Map from '../components/map/Map';
import ProjectSidebar from '../components/sidebar/ProjectSidebar';
import Sidebar from '../components/layout/Sidebar';
import { getProjects, getMapMarkers } from '../lib/api';

export default function MapPage() {
  const [projects, setProjects] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="h-[calc(100vh-64px)] relative">
      {/* Floating hamburger button - visible when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-20 left-4 z-30 p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Open sidebar"
        >
          <Menu size={20} className="text-stone-600" />
        </button>
      )}

      {/* Sidebar with ProjectSidebar content */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <ProjectSidebar
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={handleProjectSelect}
          onCloseSidebar={() => setSidebarOpen(false)}
        />
      </Sidebar>

      {/* Map - full width */}
      <div className="absolute inset-0">
        <Map
          markers={markers}
          onProjectSelect={handleProjectNavigate}
        />
      </div>
    </div>
  );
}
