// Map component - Mapbox GL JS integration
// Style Guide Part V (Component Patterns) and Part VII (Interaction Patterns)

import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import ProjectMarker from './ProjectMarker';
import HoverCard from './HoverCard';
import ClickCard from './ClickCard';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map({ markers = [], onProjectSelect, mapStyle = 'mapbox://styles/mapbox/satellite-streets-v12' }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const popupsRef = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [clickedProject, setClickedProject] = useState(null);

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

    return () => {
      map.current?.remove();
    };
  }, [mapStyle]);

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
      root.render(<ProjectMarker name={project.name} status={project.status} />);

      // Create Mapbox marker
      const marker = new mapboxgl.Marker({
        element: markerEl,
        anchor: 'center',
      })
        .setLngLat([project.coordinates.lng, project.coordinates.lat])
        .addTo(map.current);

      // Hover events
      markerEl.addEventListener('mouseenter', () => {
        setHoveredProject(project);
        markerEl.style.transform = 'scale(1.2)';
        markerEl.style.transition = 'transform 0.2s';
      });

      markerEl.addEventListener('mouseleave', () => {
        setHoveredProject(null);
        markerEl.style.transform = 'scale(1)';
      });

      // Click event
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        setClickedProject(project);
        setHoveredProject(null); // Hide hover card when clicked
      });

      markersRef.current.push(marker);
    });
  }, [markers]);

  // Handle hover popup
  useEffect(() => {
    if (!map.current) return;

    // Clear previous hover popup
    popupsRef.current.forEach((popup) => {
      if (popup._content?.classList?.contains('hover-popup')) {
        popup.remove();
      }
    });

    if (hoveredProject && !clickedProject) {
      const popupEl = document.createElement('div');
      popupEl.classList.add('hover-popup');
      const root = createRoot(popupEl);
      root.render(<HoverCard project={hoveredProject} />);

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 15,
        className: 'hover-popup-container',
      })
        .setLngLat([hoveredProject.coordinates.lng, hoveredProject.coordinates.lat])
        .setDOMContent(popupEl)
        .addTo(map.current);

      popupsRef.current.push(popup);
    }
  }, [hoveredProject, clickedProject]);

  // Handle click popup
  useEffect(() => {
    if (!map.current) return;

    // Clear previous click popup
    popupsRef.current.forEach((popup) => {
      if (popup._content?.classList?.contains('click-popup')) {
        popup.remove();
      }
    });

    if (clickedProject) {
      const popupEl = document.createElement('div');
      popupEl.classList.add('click-popup');
      const root = createRoot(popupEl);
      root.render(
        <ClickCard
          project={clickedProject}
          onViewProject={() => onProjectSelect(clickedProject)}
        />
      );

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 20,
        className: 'click-popup-container',
      })
        .setLngLat([clickedProject.coordinates.lng, clickedProject.coordinates.lat])
        .setDOMContent(popupEl)
        .addTo(map.current);

      popupsRef.current.push(popup);
    }
  }, [clickedProject, onProjectSelect]);

  return <div ref={mapContainer} className="absolute inset-0" />;
}
