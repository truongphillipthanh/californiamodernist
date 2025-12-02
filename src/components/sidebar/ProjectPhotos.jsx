// Photo View: Image-dominant grid
// Style Guide Part VI, Section 6.4

export default function ProjectPhotos({ projects, selectedId, onSelect }) {
  return (
    <div className="p-4 grid grid-cols-2 gap-3">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project)}
          className={`
            relative aspect-[4/3] rounded-lg overflow-hidden group
            ${selectedId === project.id
              ? 'ring-2 ring-stone-900'
              : ''
            }
          `}
        >
          {/* Placeholder image */}
          <div className="absolute inset-0 bg-stone-300">
            <div className="absolute inset-0 flex items-center justify-center text-stone-500 text-xs">
              No image
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="text-white text-sm font-medium truncate">
              {project.name}
            </p>
            <p className="text-white/70 text-xs truncate">
              {project.phase?.replace(/_/g, ' ')}
            </p>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>
      ))}
    </div>
  );
}
