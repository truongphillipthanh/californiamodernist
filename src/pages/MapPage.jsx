import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

// ═══════════════════════════════════════════════════════════════
// ZOOM LEVEL CONFIGURATION — Google Earth-style cinematic views
// Style Guide Part VII, lines 513, 527-540
// ═══════════════════════════════════════════════════════════════
const ZOOM_VIEWS = {
  coastline: {
    center: [-118.78, 34.02],
    zoom: 11.5,
    pitch: 0,
    bearing: 0,
    duration: 2000
  },
  neighborhood: {
    center: [-118.77, 34.025],
    zoom: 14,
    pitch: 45,
    bearing: -15,
    duration: 1800
  },
  parcel: {
    center: [-118.765, 34.032],
    zoom: 17,
    pitch: 60,
    bearing: 30,
    duration: 1500
  }
};

// Cinematic easing function (cubic ease-in-out)
const cinematicEasing = (t) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default function MapPage() {
  const [projects, setProjects] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ status: 'all', phase: 'all', zone: 'all', type: 'all' });
  const [activeLayer, setActiveLayer] = useState('map');
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/light-v11');
  const [activeZoom, setActiveZoom] = useState('coastline');
  // TASK-S001: Lifted hover state for bidirectional sidebar ↔ map coordination
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  // TASK-S001: Hover handler for bidirectional coordination
  const handleProjectHover = useCallback((projectId) => {
    setHoveredProjectId(projectId);
  }, []);

  useEffect(() => {
    Promise.all([getProjects(), getMapMarkers()]).then(([projectsData, markersData]) => {
      setProjects(projectsData);
      setMarkers(markersData);
    });
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // FILTER MARKERS — TASK-051: Filter markers based on dropdown selections
  // ═══════════════════════════════════════════════════════════════
  const filteredMarkers = useMemo(() => {
    return markers.filter((marker) => {
      // Status filter
      if (filters.status !== 'all' && marker.status !== filters.status) return false;
      // Phase filter
      if (filters.phase !== 'all' && marker.phase !== filters.phase) return false;
      // Zone filter - check if marker has this zone in its zones array
      if (filters.zone !== 'all') {
        const hasZone = marker.zones?.some(z =>
          z.toLowerCase().includes(filters.zone.toLowerCase())
        );
        if (!hasZone) return false;
      }
      // Type filter
      if (filters.type !== 'all' && marker.type !== filters.type) return false;
      return true;
    });
  }, [markers, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // ═══════════════════════════════════════════════════════════════
  // PROJECT SELECTION — TASK-055: Sidebar click triggers flyTo + ClickCard
  // ═══════════════════════════════════════════════════════════════
  const [clickedProject, setClickedProject] = useState(null);

  const handleProjectSelect = (project) => {
    // 1. Close sidebar
    setSidebarOpen(false);

    // 2. Find the full marker data (with coordinates)
    const marker = markers.find(m => m.id === project.id);
    if (!marker) return;

    // 3. Fly to project location
    if (mapRef.current && marker.coordinates) {
      mapRef.current.flyTo({
        center: [marker.coordinates.lng, marker.coordinates.lat],
        zoom: Math.max(mapRef.current.getZoom(), 15),
        duration: 1500,
        essential: true
      });
    }

    // 4. Open Click Card
    setClickedProject(marker);
    setSelectedProject(project);
  };

  const handleCloseClickCard = useCallback(() => {
    setClickedProject(null);
  }, []);

  const handleProjectNavigate = (project) => {
    navigate(`/project/${project.id}`);
  };

  const handleLayerChange = (layerId, style) => {
    setActiveLayer(layerId);
    setMapStyle(style);
  };

  // ═══════════════════════════════════════════════════════════════
  // ZOOM LEVEL CONTROL — Cinematic flyTo transitions
  // ═══════════════════════════════════════════════════════════════
  const handleZoomChange = useCallback((level) => {
    if (!mapRef.current) return;

    const view = ZOOM_VIEWS[level];
    const map = mapRef.current;

    // If a project is selected, use its coordinates, else use view center
    const center = selectedProject?.coordinates
      ? [selectedProject.coordinates.lng, selectedProject.coordinates.lat]
      : view.center;

    map.flyTo({
      center: center,
      zoom: view.zoom,
      pitch: view.pitch,
      bearing: view.bearing,
      duration: view.duration,
      essential: true,
      easing: cinematicEasing
    });

    setActiveZoom(level);
  }, [selectedProject]);

  return (
    <div className="h-[calc(100vh-72px)] relative">
      {/* Floating hamburger button - HIDDEN when sidebar is open (TASK-036) */}
      {/* When sidebar opens, hamburger moves into sidebar header via ViewToggle */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-[76px] left-4 z-[60] p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
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
          hoveredProjectId={hoveredProjectId}
          onHoverProject={handleProjectHover}
        />
      </Sidebar>

      {/* Floating map controls */}
      <FloatingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <MalibuBeacon />

      <LayerToggle
        activeLayer={activeLayer}
        onLayerChange={handleLayerChange}
      />

      <ZoomLevelPills
        activeLevel={activeZoom}
        onZoomChange={handleZoomChange}
      />

      {/* Map - full width */}
      <div className="absolute inset-0">
        <Map
          ref={mapRef}
          markers={filteredMarkers}
          onProjectSelect={handleProjectNavigate}
          mapStyle={mapStyle}
          clickedProject={clickedProject}
          onClickedProjectChange={setClickedProject}
          hoveredProjectId={hoveredProjectId}
          onHoverProject={handleProjectHover}
        />
      </div>
    </div>
  );
}
