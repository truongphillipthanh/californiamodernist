// List View: Name-only with hover expand to card content
// Style Guide Part VI, Section 6.2
// TASK-S003: Bidirectional hover - expands to show card content on hover

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

export default function ProjectList({ projects, selectedId, onSelect, hoveredProjectId, onHoverProject }) {
  // Determine which ID to highlight - external hover takes priority for bidirectional sync
  const highlightedId = hoveredProjectId;

  return (
    <ul className="divide-y divide-stone-100">
      {projects.map((project) => {
        const isHighlighted = highlightedId === project.id;
        const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS.active;
        const statusLabel = STATUS_LABELS[project.status] || project.status?.toUpperCase();

        return (
          <li
            key={project.id}
            className={`
              cursor-pointer transition-all duration-150 ease-out
              ${isHighlighted ? 'bg-stone-100' : selectedId === project.id ? 'bg-stone-100' : 'hover:bg-stone-50'}
            `}
            onClick={() => onSelect(project)}
            onMouseEnter={() => onHoverProject?.(project.id)}
            onMouseLeave={() => onHoverProject?.(null)}
          >
            {isHighlighted ? (
              /* EXPANDED STATE - Card content inline */
              <div className="p-4">
                {/* Row 1: Status badge + Project type */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white uppercase tracking-wide"
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
                <p className="text-sm text-stone-500 mb-2">
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
              </div>
            ) : (
              /* COLLAPSED STATE - Name only */
              <div className="py-3 px-4 flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: statusColor }}
                />
                <span className="text-sm font-medium text-stone-800 truncate">
                  {project.name}
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
