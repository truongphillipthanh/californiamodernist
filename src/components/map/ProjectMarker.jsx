// ProjectMarker: Map markers with project names and status dots
// Style Guide Part V, Section 5.1
// Display font: SF Compact Display, uppercase, centered
// Marker structure: Name on top, status dot centered below

export default function ProjectMarker({ name, status }) {
  const statusColors = {
    active: '#22C55E',
    pending: '#F59E0B',
    complete: '#3B82F6',
    blocked: '#EF4444',
  };

  return (
    <div
      className="bg-white rounded-sm shadow-lg px-2 py-1 cursor-pointer transition-transform duration-100 hover:scale-105 hover:shadow-xl"
      style={{
        fontFamily: '"SF Compact Display", "Roboto Condensed", "Segoe UI", "Bebas Neue", sans-serif',
      }}
    >
      {/* Project name - uppercase, centered, Display font */}
      <div className="text-stone-800 text-xs font-medium uppercase tracking-tight text-center whitespace-nowrap">
        {name}
      </div>

      {/* Status dot - centered below name */}
      <div className="flex justify-center mt-0.5">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: statusColors[status] || '#71717A' }}
        />
      </div>
    </div>
  );
}
