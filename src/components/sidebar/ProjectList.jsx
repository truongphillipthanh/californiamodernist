// List View: Compact rows, maximum density
// Style Guide Part VI, Section 6.2

export default function ProjectList({ projects, selectedId, onSelect }) {
  const statusDot = {
    active: 'bg-status-active',
    pending: 'bg-status-pending',
    complete: 'bg-status-complete',
    blocked: 'bg-status-blocked',
  };

  return (
    <ul className="divide-y divide-stone-100">
      {projects.map((project) => (
        <li key={project.id}>
          <button
            onClick={() => onSelect(project)}
            className={`
              w-full text-left px-4 py-3 transition-colors
              ${selectedId === project.id
                ? 'bg-stone-100'
                : 'hover:bg-stone-50'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${statusDot[project.status] || 'bg-stone-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-900 truncate">
                  {project.name}
                </p>
                <p className="text-xs text-stone-500 truncate">
                  {project.parcel?.address}
                </p>
              </div>
              <span className="text-xs text-stone-400 capitalize">
                {project.phase?.replace(/_/g, ' ')}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
