// Map component - Mapbox GL JS integration
// Style Guide Part V (Component Patterns) and Part VII (Interaction Patterns)
// TASK-019: Hover card singleton with 200ms dismissal delay
// TASK-040: Fixed hover card positioning - use viewport coordinates, not Mapbox Popup
// TASK-050: Expose map ref via forwardRef for parent zoom control

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import ProjectMarker from './ProjectMarker';
import HoverCard from './HoverCard';
import ClickCard from './ClickCard';

mapboxgl.accessToken = 'pk.eyJ1IjoidHJ1b25ncGhpbGxpcHRoYW5oIiwiYSI6ImNtaWdtaWhzaTA4ZWkzZXBsMXlocmZkZGIifQ.02JrRcL3oBb0GapLvvfpPg';

const Map = forwardRef(function Map({
  markers = [],
  onProjectSelect,
  mapStyle = 'mapbox://styles/mapbox/light-v11',
  // TASK-055: Accept controlled clickedProject state from parent
  clickedProject: externalClickedProject,
  onClickedProjectChange,
  // TASK-S001: Accept controlled hoveredProjectId state from parent
  hoveredProjectId: externalHoveredProjectId,
  onHoverProject,
}, ref) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const popupsRef = useRef([]);
  const hoverTimeoutRef = useRef(null);

  // ═══════════════════════════════════════════════════════════════
  // HOVER STATE — Single ID + viewport position
  // TASK-S001: Use external state if provided, otherwise use internal state
  // ═══════════════════════════════════════════════════════════════
  const [internalHoveredProjectId, setInternalHoveredProjectId] = useState(null);
  const hoveredProjectId = externalHoveredProjectId !== undefined ? externalHoveredProjectId : internalHoveredProjectId;
  const setHoveredProjectId = onHoverProject || setInternalHoveredProjectId;
  const [hoverPosition, setHoverPosition] = useState(null); // { x, y } viewport coords
  // TASK-055: Use external state if provided, otherwise use internal state
  const [internalClickedProject, setInternalClickedProject] = useState(null);
  const clickedProject = externalClickedProject !== undefined ? externalClickedProject : internalClickedProject;
  const setClickedProject = onClickedProjectChange || setInternalClickedProject;
  const [mapReady, setMapReady] = useState(false);

  // TASK-050: Expose map instance to parent for flyTo control
  useImperativeHandle(ref, () => map.current, [mapReady]);

  // Get the full project object for the hovered project
  const hoveredProject = hoveredProjectId
    ? markers.find(p => p.id === hoveredProjectId)
    : null;

  // ═══════════════════════════════════════════════════════════════
  // HOVER HANDLERS
  // ═══════════════════════════════════════════════════════════════

  // TASK-040: Pass position with the project ID for fixed positioning
  const handleMarkerEnter = useCallback((projectId, position) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoverPosition(position);  // Set position FIRST
    setHoveredProjectId(projectId);
  }, []);

  const handleMarkerLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredProjectId(null);
      setHoverPosition(null);
      hoverTimeoutRef.current = null;
    }, 200);
  }, []);

  const handleCardEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleCardLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredProjectId(null);
      setHoverPosition(null);
      hoverTimeoutRef.current = null;
    }, 200);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [-118.7798, 34.0259], // Malibu center
      zoom: 12,
    });

    // Add navigation controls (bottom-right)
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'bottom-right'
    );

    // Close click card when clicking map background
    map.current.on('click', (e) => {
      // Only close if clicking directly on map (not a marker)
      if (e.originalEvent.target === mapContainer.current.querySelector('canvas')) {
        setClickedProject(null);
      }
    });

    // TASK-050: Signal map is ready for ref forwarding
    map.current.on('load', () => {
      setMapReady(true);
    });
  }, []);

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map style when mapStyle prop changes
  useEffect(() => {
    if (!map.current) return;
    map.current.setStyle(mapStyle);
  }, [mapStyle]);

  // Update markers when data changes
  useEffect(() => {
    if (!map.current || !markers.length) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Clear existing popups
    popupsRef.current.forEach((popup) => popup.remove());
    popupsRef.current = [];

    // Add new markers
    markers.forEach((project) => {
      if (!project.coordinates) return;

      // Create marker element
      const markerEl = document.createElement('div');
      const root = createRoot(markerEl);
      root.render(
        <ProjectMarker
          project={project}
          isHovered={project.id === hoveredProjectId}
        />
      );

      // Create Mapbox marker
      const marker = new mapboxgl.Marker({
        element: markerEl,
        anchor: 'center',
      })
        .setLngLat([project.coordinates.lng, project.coordinates.lat])
        .addTo(map.current);

      // TASK-040: Hover events with viewport position calculation
      markerEl.addEventListener('mouseenter', () => {
        const rect = markerEl.getBoundingClientRect();
        const position = {
          x: rect.left + rect.width / 2,  // Center of marker
          y: rect.top                      // Top of marker
        };
        handleMarkerEnter(project.id, position);
      });

      markerEl.addEventListener('mouseleave', () => {
        handleMarkerLeave();
      });

      // Click event
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        setClickedProject(project);
        setHoveredProjectId(null);
        setHoverPosition(null);
      });

      markersRef.current.push(marker);
    });
  }, [markers, hoveredProjectId, handleMarkerEnter, handleMarkerLeave]);

  // TASK-040: Hover card is now rendered as React component with fixed positioning
  // (no more Mapbox Popup for hover - eliminates (0,0) flash)

  // TASK-054: Handle click card as modal (no Mapbox Popup)
  // TASK-055: When parent controls clickedProject, parent handles flyTo
  // This effect only runs for internal marker clicks (when externalClickedProject is undefined)
  useEffect(() => {
    // Skip if parent controls state or no project clicked
    if (externalClickedProject !== undefined || !map.current || !internalClickedProject) return;

    // Fly to the clicked project (marker click case)
    map.current.flyTo({
      center: [internalClickedProject.coordinates.lng, internalClickedProject.coordinates.lat],
      zoom: Math.max(map.current.getZoom(), 15),
      duration: 1200,
      essential: true
    });
  }, [internalClickedProject, externalClickedProject]);

  // Close click card handler
  const handleCloseClickCard = useCallback(() => {
    setClickedProject(null);
  }, []);

  return (
    <>
      <div ref={mapContainer} className="absolute inset-0" />

      {/* TASK-040: Hover card rendered with fixed positioning (outside Mapbox container) */}
      {hoveredProject && hoverPosition && !clickedProject && (
        <HoverCard
          project={hoveredProject}
          position={hoverPosition}
          onMouseEnter={handleCardEnter}
          onMouseLeave={handleCardLeave}
        />
      )}

      {/* TASK-054: Click card as centered modal */}
      {clickedProject && (
        <ClickCard
          project={clickedProject}
          onClose={handleCloseClickCard}
          onViewProject={() => onProjectSelect(clickedProject)}
        />
      )}
    </>
  );
});

export default Map;
