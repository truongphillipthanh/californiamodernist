// Zoom Level Pills - Bottom-right zoom level indicators
// Style Guide Part X, Section 10.4
// TASK-025: Aligned to bottom: 24px baseline, 16px gap from Mapbox controls

const zoomLevels = ['COASTLINE', 'NEIGHBORHOOD', 'PARCEL'];

export default function ZoomLevelPills() {
  // Position: bottom 24px, right edge at 16px + 29px (Mapbox ctrl) + 16px (gap) = 61px
  // Using right-[77px] to account for Mapbox control width (~45px) + 16px gap + buffer
  return (
    <div className="fixed bottom-6 right-[77px] z-20 pointer-events-auto">
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
