// Zoom Level Pills - Bottom-right zoom level indicators
// Style Guide Part X, Section 10.4
// TASK-043: Positioned BELOW Mapbox controls, right edge aligned, 4px gap

const zoomLevels = [
  { id: 'coastline', label: 'Coastline' },
  { id: 'neighborhood', label: 'Neighborhood' },
  { id: 'parcel', label: 'Parcel' },
];

export default function ZoomLevelPills({ activeLevel = 'neighborhood' }) {
  // Position: bottom-right, BELOW Mapbox +/- controls, right edge aligned
  return (
    <div className="fixed bottom-6 right-6 z-20 pointer-events-auto">{/* bottom-6 = 24px, right-6 = 24px */}
      <div className="bg-white rounded-lg shadow-lg p-1 flex items-center gap-1">
        {zoomLevels.map((level) => (
          <span
            key={level.id}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeLevel === level.id
                ? 'bg-stone-800 text-white'
                : 'text-stone-600'
              }
            `}
          >
            {level.label}
          </span>
        ))}
      </div>
    </div>
  );
}
