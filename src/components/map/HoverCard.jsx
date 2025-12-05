// HoverCard: Hover popup on marker hover
// Style Guide Part V, Section 5.3
// TASK-019: Updated with mouse event handlers for singleton pattern
// TASK-040: Fixed positioning using viewport coordinates (no more (0,0) flash)
// 280px wide, shows photo, name, address, status row
// Appears with 200ms transition

import React from 'react';

const STATUS_COLORS = {
  blocked: { bg: 'bg-red-600', text: 'text-white', label: 'BLOCKED' },
  waiting: { bg: 'bg-amber-500', text: 'text-white', label: 'WAITING' },
  active: { bg: 'bg-green-600', text: 'text-white', label: 'ACTIVE' },
  complete: { bg: 'bg-indigo-500', text: 'text-white', label: 'COMPLETE' },
  on_hold: { bg: 'bg-stone-500', text: 'text-white', label: 'ON HOLD' },
  pending: { bg: 'bg-amber-500', text: 'text-white', label: 'PENDING' },
};

export default function HoverCard({ project, position, onMouseEnter, onMouseLeave }) {
  // TASK-040: Don't render if no valid position or project
  if (!position || !project) return null;

  const status = STATUS_COLORS[project.status] || STATUS_COLORS.active;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed z-50 pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%) translateY(-12px)', // Center above marker
      }}
    >
      <div className="w-[280px] bg-white rounded shadow-lg overflow-hidden">
      {/* Image Area — 16:9 */}
      <div className="w-full aspect-video bg-stone-200 relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-stone-800 leading-tight">
          {project.name}
        </h3>
        <p className="text-sm text-stone-500 mt-0.5">
          {project.address}
        </p>

        {/* Status Row */}
        <div className="flex items-center gap-2 mt-3">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ${status.bg} ${status.text}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
            {status.label}
          </span>
          <span className="text-xs text-stone-500 uppercase tracking-wide">
            {project.phase}
          </span>
          {project.daysInPhase && (
            <>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500">{project.daysInPhase} days</span>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
