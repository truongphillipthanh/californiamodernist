// ProjectMarker: Map markers with shorthand names and status dots
// Style Guide Part V, Section 5.1
// TASK-014: Enhanced typography for legibility over satellite imagery
// TASK-019: Updated to accept mouse handlers and hover state
// Display font: SF Compact Display, uppercase, Stone 900, +10% tracking
// Text shadow for contrast over map imagery

export default function ProjectMarker({ name, status, isHovered = false, project }) {
  const statusColors = {
    active: '#22C55E',
    pending: '#F59E0B',
    complete: '#3B82F6',
    blocked: '#EF4444',
  };

  return (
    <div
      className="bg-white cursor-pointer transition-transform duration-100"
      style={{
        fontFamily: '"SF Compact Display", "Roboto Condensed", "Segoe UI", "Bebas Neue", sans-serif',
        padding: '6px 16px 8px 16px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {/* Project shorthand name - uppercase, Display font, enhanced legibility */}
      <div
        className="text-center whitespace-nowrap"
        style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#1c1917', // Stone 900
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}
      >
        {name}
      </div>

      {/* Status dot - centered below name, 8px */}
      <div className="flex justify-center mt-1">
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: statusColors[status] || '#71717A',
          }}
        />
      </div>
    </div>
  );
}
