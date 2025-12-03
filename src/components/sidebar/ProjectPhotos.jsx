// Photo View: Vertical HoverCard list
// Style Guide Part VI, Section 6.4
// TASK-016: Displays HoverCard components in vertical scrollable list

import HoverCard from '../map/HoverCard';

export default function ProjectPhotos({ projects, selectedId, onSelect }) {
  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => onSelect(project)}
          className={`
            cursor-pointer transition-colors
            ${selectedId === project.id
              ? 'bg-stone-100'
              : 'hover:bg-stone-50'
            }
          `}
        >
          <HoverCard project={project} />
        </div>
      ))}
    </div>
  );
}
