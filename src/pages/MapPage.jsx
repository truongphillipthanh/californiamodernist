import { useState, useEffect } from 'react';
import { getMapMarkers } from '../lib/api';

export default function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getMapMarkers().then(setMarkers);
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] relative">
      {/* Map placeholder — will be replaced with Mapbox */}
      <div className="absolute inset-0 bg-stone-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 text-lg">Map Component</p>
          <p className="text-stone-400 text-sm mt-1">
            {markers.length} projects loaded
          </p>
        </div>
      </div>

      {/* Project markers list (temporary, for testing data) */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">
          Projects
        </p>
        <ul className="space-y-1">
          {markers.map((marker) => (
            <li key={marker.id}>
              <button
                onClick={() => setSelectedProject(marker)}
                className={`
                  w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                  ${selectedProject?.id === marker.id
                    ? 'bg-stone-900 text-white'
                    : 'hover:bg-stone-100 text-stone-700'
                  }
                `}
              >
                {marker.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected project info (temporary) */}
      {selectedProject && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-72">
          <p className="font-medium text-stone-900">{selectedProject.name}</p>
          <p className="text-sm text-stone-500 mt-1">{selectedProject.address}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className={`
              inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
              ${selectedProject.status === 'active' ? 'bg-green-100 text-green-700' : ''}
              ${selectedProject.status === 'pending' ? 'bg-amber-100 text-amber-700' : ''}
              ${selectedProject.status === 'complete' ? 'bg-blue-100 text-blue-700' : ''}
            `}>
              {selectedProject.status}
            </span>
            <span className="text-xs text-stone-400">{selectedProject.phase}</span>
          </div>
        </div>
      )}
    </div>
  );
}
