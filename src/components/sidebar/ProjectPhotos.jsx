// Photo View: Vertical HoverCard list
// Style Guide Part VI, Section 6.4
// TASK-016: Displays HoverCard components in vertical scrollable list
// TASK-S008: Bidirectional hover - highlight with ring on hover
// TASK-S011: Unified raised hover effect across all views

import HoverCard from '../map/HoverCard';

export default function ProjectPhotos({ projects, selectedId, onSelect, hoveredProjectId, onHoverProject }) {
  return (
    <div className="p-3 space-y-3">
      {projects.map((project) => {
        const isHighlighted = hoveredProjectId === project.id;

        return (
          // TASK-S011: Unified raised hover effect - matches Card view
          <div
            key={project.id}
            onClick={() => onSelect(project)}
            onMouseEnter={() => onHoverProject?.(project.id)}
            onMouseLeave={() => onHoverProject?.(null)}
            className={`
              rounded-lg overflow-hidden border cursor-pointer
              transition-all duration-100 ease-out
              ${isHighlighted
                ? 'shadow-lg border-stone-300 -translate-y-0.5'
                : selectedId === project.id
                  ? 'shadow-sm border-stone-900'
                  : 'shadow-md border-stone-200 hover:shadow-lg hover:border-stone-300'
              }
            `}
          >
            <HoverCard project={project} />
          </div>
        );
      })}
    </div>
  );
}
