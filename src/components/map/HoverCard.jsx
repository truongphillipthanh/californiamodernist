// HoverCard: Hover popup on marker hover
// Style Guide Part V, Section 5.3
// 280px wide, shows photo, name, address, status row
// Appears with 200ms transition

export default function HoverCard({ project }) {
  const statusColors = {
    active: '#22C55E',
    pending: '#F59E0B',
    complete: '#3B82F6',
    blocked: '#EF4444',
  };

  const statusLabels = {
    active: 'ACTIVE',
    pending: 'WAITING',
    complete: 'COMPLETE',
    blocked: 'BLOCKED',
  };

  return (
    <div className="bg-white rounded shadow-xl w-[280px] overflow-hidden">
      {/* Photo/Render - 16:9 aspect ratio */}
      <div className="w-full aspect-video bg-stone-200 flex items-center justify-center">
        {project.image ? (
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Project name - Heading 2: 18px medium */}
        <h3 className="text-lg font-medium text-stone-900 mb-1">{project.name}</h3>

        {/* Address - Body Small: 13px Stone 500 */}
        <p className="text-[13px] text-stone-500 mb-3">{project.address}</p>

        {/* Status row: ● STATUS · PHASE · DAYS */}
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColors[project.status] || '#71717A' }}
            />
            <span className="font-medium uppercase">{statusLabels[project.status] || project.status}</span>
          </div>
          {project.phase && (
            <>
              <span className="text-stone-400">·</span>
              <span className="font-mono uppercase">{project.phase}</span>
            </>
          )}
          {project.daysInPhase && (
            <>
              <span className="text-stone-400">·</span>
              <span>{project.daysInPhase} days</span>
            </>
          )}
        </div>

        {/* Blocker note (if blocked status) */}
        {project.status === 'blocked' && project.blockerNote && (
          <div className="mt-3 pt-3 border-t border-stone-200">
            <p className="text-xs text-stone-600 italic">{project.blockerNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
