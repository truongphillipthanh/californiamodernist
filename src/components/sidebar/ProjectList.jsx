// List View: Name-only with hover tooltip
// Style Guide Part VI, Section 6.2

import { useState } from 'react';

export default function ProjectList({ projects, selectedId, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);

  const statusDot = {
    active: 'bg-status-active',
    pending: 'bg-status-pending',
    complete: 'bg-status-complete',
    blocked: 'bg-status-blocked',
  };

  const statusStyles = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    complete: 'bg-blue-100 text-blue-700',
    blocked: 'bg-red-100 text-red-700',
  };

  return (
    <ul className="divide-y divide-stone-100">
      {projects.map((project) => (
        <li
          key={project.id}
          className="relative"
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <button
            onClick={() => onSelect(project)}
            className={`
              w-full text-left px-4 py-3 transition-all duration-100
              ${selectedId === project.id
                ? 'bg-stone-100'
                : hoveredId === project.id
                ? 'bg-stone-100'
                : 'hover:bg-stone-50'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {/* Status dot */}
              <div className={`w-2 h-2 rounded-full ${statusDot[project.status] || 'bg-stone-400'}`} />

              {/* Project name only */}
              <p className="text-sm font-medium text-stone-800 truncate">
                {project.name}
              </p>
            </div>
          </button>

          {/* Tooltip on hover - TASK-016: address, divider, phase/status/days */}
          {hoveredId === project.id && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
              <div className="bg-white rounded-lg shadow-lg p-3 min-w-[200px] max-w-[280px] border border-stone-200">
                <p className="text-xs text-stone-600 mb-2">{project.parcel?.address}</p>
                <div className="h-px bg-stone-200 my-2" />
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <span className={`
                    inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                    ${statusStyles[project.status] || 'bg-stone-100 text-stone-600'}
                  `}>
                    {project.status}
                  </span>
                  <span className="text-stone-400">|</span>
                  <span>{project.phase?.replace(/_/g, ' ')}</span>
                  {project.lastAction && (
                    <>
                      <span className="text-stone-400">|</span>
                      <span>{project.lastAction.daysAgo}d ago</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
