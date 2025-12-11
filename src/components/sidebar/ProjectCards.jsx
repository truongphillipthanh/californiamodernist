// Card View: Medium cards with more detail
// Style Guide Part VI, Section 6.3
// TASK-S004: Bidirectional hover - highlight with elevation on hover
// TASK-S011: Unified raised hover effect across all views

const STATUS_COLORS = {
  blocked: '#DC2626',
  waiting: '#D97706',
  active: '#16A34A',
  complete: '#6366F1',
  on_hold: '#78716C',
  pending: '#D97706',
};

const STATUS_LABELS = {
  blocked: 'BLOCKED',
  waiting: 'WAITING',
  active: 'ACTIVE',
  complete: 'COMPLETE',
  on_hold: 'ON HOLD',
  pending: 'PENDING',
};

export default function ProjectCards({ projects, selectedId, onSelect, hoveredProjectId, onHoverProject }) {
  return (
    <div className="p-4 space-y-3">
      {projects.map((project) => {
        const isHighlighted = hoveredProjectId === project.id;
        const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS.active;
        const statusLabel = STATUS_LABELS[project.status] || project.status?.toUpperCase();

        return (
          <button
            key={project.id}
            onClick={() => onSelect(project)}
            onMouseEnter={() => onHoverProject?.(project.id)}
            onMouseLeave={() => onHoverProject?.(null)}
            className={`
              w-full text-left p-4 rounded-lg border transition-all duration-100 ease-out
              ${isHighlighted
                ? 'border-stone-300 bg-white shadow-lg -translate-y-0.5'
                : selectedId === project.id
                  ? 'border-stone-900 bg-stone-50 shadow-sm'
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md shadow-sm'
              }
            `}
          >
            {/* Row 1: Status badge + Project type */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white uppercase tracking-wide shrink-0"
                style={{ backgroundColor: statusColor }}
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />
                {statusLabel}
              </span>
              {project.type && (
                <span className="text-xs text-stone-500 uppercase tracking-wide">
                  {project.type.replace(/_/g, ' ')}
                </span>
              )}
            </div>

            {/* Row 2: Project name */}
            <h3 className="font-semibold text-stone-800 mb-1">
              {project.name}
            </h3>

            {/* Row 3: Address */}
            <p className="text-sm text-stone-500 mb-3">
              {project.parcel?.address || project.address}
            </p>

            {/* Row 4: Metrics */}
            <div className="flex items-center gap-2 text-xs text-stone-400">
              {project.lastAction?.daysAgo !== undefined && (
                <span>{project.lastAction.daysAgo} DAYS</span>
              )}
              {project.phase && (
                <>
                  {project.lastAction?.daysAgo !== undefined && <span>·</span>}
                  <span className="capitalize">{project.phase.replace(/_/g, ' ')}</span>
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
