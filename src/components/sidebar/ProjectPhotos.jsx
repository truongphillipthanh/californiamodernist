// Photo View: Vertical HoverCard list
// Style Guide Part VI, Section 6.4
// TASK-016: Displays HoverCard components in vertical scrollable list
// TASK-S008: Bidirectional hover - highlight with ring on hover

import HoverCard from '../map/HoverCard';

export default function ProjectPhotos({ projects, selectedId, onSelect, hoveredProjectId, onHoverProject }) {
  return (
    <div className="flex flex-col">
      {projects.map((project) => {
        const isHighlighted = hoveredProjectId === project.id;

        return (
          <div
            key={project.id}
            onClick={() => onSelect(project)}
            onMouseEnter={() => onHoverProject?.(project.id)}
            onMouseLeave={() => onHoverProject?.(null)}
            className={`
              cursor-pointer transition-all duration-100 ease-out
              ${isHighlighted
                ? 'bg-stone-100 ring-2 ring-inset ring-stone-300'
                : selectedId === project.id
                  ? 'bg-stone-100'
                  : 'hover:bg-stone-50'
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
