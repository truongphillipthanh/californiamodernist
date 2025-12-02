// Map component - Placeholder for Mapbox integration
// Will be replaced with actual Mapbox GL JS implementation

export default function Map({ markers = [], onProjectSelect }) {
  return (
    <div className="absolute inset-0 bg-stone-200 flex items-center justify-center">
      <div className="text-center">
        <p className="text-stone-500 text-lg">Map Component</p>
        <p className="text-stone-400 text-sm mt-1">
          {markers.length} project markers loaded
        </p>
        <p className="text-stone-400 text-xs mt-2">
          Mapbox GL JS integration pending
        </p>
      </div>
    </div>
  );
}
