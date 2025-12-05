// Layer Toggle - Center-bottom map style selector
// Style Guide Part X, Section 10.4
// TASK-031: Aligned to bottom: 24px baseline (same as zoom pills and Mapbox controls)
// TASK-052: Monochromatic default (light-v11) so status colors pop

const layers = [
  { id: 'map', label: 'Map', style: 'mapbox://styles/mapbox/light-v11' },
  { id: 'satellite', label: 'Satellite', style: 'mapbox://styles/mapbox/satellite-streets-v12' },
  { id: 'terrain', label: 'Terrain', style: 'mapbox://styles/mapbox/outdoors-v12' },
];

export default function LayerToggle({ activeLayer, onLayerChange }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">{/* bottom-6 = 24px baseline */}
      <div className="bg-white rounded-lg shadow-lg p-1 flex items-center gap-1">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => onLayerChange(layer.id, layer.style)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeLayer === layer.id
                ? 'bg-stone-800 text-white'
                : 'text-stone-600 hover:bg-stone-100'
              }
            `}
          >
            {layer.label}
          </button>
        ))}
      </div>
    </div>
  );
}
