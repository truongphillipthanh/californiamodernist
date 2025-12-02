// ProjectMarker: Status-colored circular markers
// Style Guide Part V, Section 5.2

export default function ProjectMarker({ status }) {
  const statusColors = {
    active: '#22C55E',
    pending: '#F59E0B',
    complete: '#3B82F6',
    blocked: '#EF4444',
  };

  return (
    <div
      className="relative w-6 h-6 cursor-pointer"
      style={{
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
      }}
    >
      {/* Outer ring (white) */}
      <div className="absolute inset-0 bg-white rounded-full" />

      {/* Inner dot (status color) */}
      <div
        className="absolute inset-1 rounded-full"
        style={{ backgroundColor: statusColors[status] || '#71717A' }}
      />
    </div>
  );
}
