// Zoom Level Pills - Bottom-right zoom level indicators
// Style Guide Part X, Section 10.4

const zoomLevels = ['COASTLINE', 'NEIGHBORHOOD', 'PARCEL'];

export default function ZoomLevelPills() {
  return (
    <div className="fixed bottom-6 right-16 z-20 pointer-events-auto">
      <div className="bg-white rounded-lg shadow-lg px-2 py-1 flex items-center gap-1">
        {zoomLevels.map((level, index) => (
          <div key={level} className="flex items-center">
            <span className="px-2 py-1 text-xs font-mono text-stone-500 uppercase tracking-wide">
              {level}
            </span>
            {index < zoomLevels.length - 1 && (
              <div className="w-px h-3 bg-stone-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
