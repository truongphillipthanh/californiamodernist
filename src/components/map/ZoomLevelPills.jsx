// Zoom Level Pills - Bottom-right zoom level indicators
// Style Guide Part X, Section 10.4
// TASK-043: Positioned BELOW Mapbox controls, right edge aligned, 4px gap
// TASK-050: Wired to Mapbox flyTo with cinematic transitions

const zoomLevels = [
  { id: 'coastline', label: 'Coastline' },
  { id: 'neighborhood', label: 'Neighborhood' },
  { id: 'parcel', label: 'Parcel' },
];

export default function ZoomLevelPills({ activeLevel = 'coastline', onZoomChange }) {
  // Position: bottom-right, BELOW Mapbox +/- controls, right edge aligned
  return (
    <div className="fixed bottom-6 right-6 z-20 pointer-events-auto">
      <div className="bg-white rounded-lg shadow-lg p-1 flex items-center gap-1">
        {zoomLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => onZoomChange?.(level.id)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
              ${activeLevel === level.id
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-50'
              }
            `}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
