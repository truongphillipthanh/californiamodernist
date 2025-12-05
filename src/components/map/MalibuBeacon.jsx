// Malibu Beacon - Center-bottom location display
// Style Guide Part X, Section 10.4
// TASK-031: Positioned above layer toggle
// TASK-049: Bottom edge aligns with Mapbox controls, 4px gap above Layer Pills

import { Circle } from 'lucide-react';

export default function MalibuBeacon() {
  return (
    <div className="fixed bottom-[68px] left-1/2 -translate-x-1/2 z-20 pointer-events-auto">{/* 4px gap above Layer Pills, aligns with Mapbox controls */}
      <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-3">
        {/* Dot icon */}
        <Circle size={12} className="text-stone-700 fill-stone-700" />

        {/* Location name */}
        <span className="text-sm font-medium text-stone-700">Malibu, CA</span>

        {/* Divider */}
        <div className="w-px h-4 bg-stone-200" />

        {/* Coordinates */}
        <span className="text-xs text-stone-500 font-mono">
          34.0259° N, 118.7798° W
        </span>
      </div>
    </div>
  );
}
