import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Map from '../components/map/Map';
import ProjectSidebar from '../components/sidebar/ProjectSidebar';
import Sidebar from '../components/layout/Sidebar';
import FloatingFilters from '../components/map/FloatingFilters';
import MalibuBeacon from '../components/map/MalibuBeacon';
import LayerToggle from '../components/map/LayerToggle';
import ZoomLevelPills from '../components/map/ZoomLevelPills';
import { getProjects, getMapMarkers } from '../lib/api';

export default function MapPage() {
  const [projects, setProjects] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ status: 'all', phase: 'all', zone: 'all', type: 'all' });
  const [activeLayer, setActiveLayer] = useState('satellite');
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/satellite-streets-v12');
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

  const handleLayerChange = (layerId, style) => {
    setActiveLayer(layerId);
    setMapStyle(style);
  };

  return (
    <div className="h-[calc(100vh-64px)] relative">
      {/* Floating hamburger button - always visible at fixed position, toggles sidebar */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-[60] p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <Menu size={20} className="text-stone-600" />
      </button>

      {/* Sidebar with ProjectSidebar content */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <ProjectSidebar
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={handleProjectSelect}
        />
      </Sidebar>

      {/* Floating map controls */}
      <FloatingFilters
        filters={filters}
        onFilterChange={setFilters}
      />

      <MalibuBeacon />

      <LayerToggle
        activeLayer={activeLayer}
        onLayerChange={handleLayerChange}
      />

      <ZoomLevelPills />

      {/* Map - full width */}
      <div className="absolute inset-0">
        <Map
          markers={markers}
          onProjectSelect={handleProjectNavigate}
          mapStyle={mapStyle}
        />
      </div>
    </div>
  );
}
