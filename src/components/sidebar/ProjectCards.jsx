// Card View: Medium cards with more detail
// Style Guide Part VI, Section 6.3

export default function ProjectCards({ projects, selectedId, onSelect }) {
  const statusStyles = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    complete: 'bg-blue-100 text-blue-700',
    blocked: 'bg-red-100 text-red-700',
  };

  return (
    <div className="p-4 space-y-3">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project)}
          className={`
            w-full text-left p-4 rounded-lg border transition-all
            ${selectedId === project.id
              ? 'border-stone-900 bg-stone-50'
              : 'border-stone-200 bg-white hover:border-stone-300'
            }
          `}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-stone-900">{project.name}</h3>
            <span className={`
              inline-flex items-center px-2 py-0.5 rounded text-xs font-medium shrink-0
              ${statusStyles[project.status] || 'bg-stone-100 text-stone-700'}
            `}>
              {project.status}
            </span>
          </div>

          <p className="text-sm text-stone-500 mt-1">{project.parcel?.address}</p>

          <div className="flex items-center gap-3 mt-3 text-xs text-stone-400">
            <span className="capitalize">{project.type?.replace(/_/g, ' ')}</span>
            <span>•</span>
            <span className="capitalize">{project.phase?.replace(/_/g, ' ')}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
