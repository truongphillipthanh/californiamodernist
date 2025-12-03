import React from 'react';

const STATUS_COLORS = {
  blocked: '#DC2626',
  waiting: '#D97706',
  active: '#16A34A',
  complete: '#6366F1',
  on_hold: '#78716C',
};

export default function ProjectMarker({
  project,
  isHovered = false,
  isEmphasized = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS.active;
  const scale = isEmphasized ? 1.1 : isHovered ? 1.05 : 1;

  const displayName = project.displayName
    || project.shortName
    || project.name.split(' ')[0].toUpperCase();

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="cursor-pointer select-none"
      style={{
        transform: `scale(${scale})`,
        transition: 'transform 100ms ease-out',
      }}
    >
      {/* Marker Body */}
      <div
        className="flex items-center justify-center gap-1.5"
        style={{
          backgroundColor: '#1C1917',
          padding: '6px 12px',
          borderRadius: '4px',
          boxShadow: isEmphasized
            ? `0 0 12px 2px ${statusColor}33, 0 2px 8px rgba(0,0,0,0.3)`
            : isHovered
              ? '0 4px 12px rgba(0,0,0,0.25)'
              : '0 2px 6px rgba(0,0,0,0.2)',
        }}
      >
        {/* Status Dot */}
        <div
          className="flex-shrink-0"
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: statusColor,
          }}
        />

        {/* Project Name */}
        <span
          style={{
            fontFamily: '"SF Compact Display", "Roboto Condensed", -apple-system, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#FAFAF9',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {displayName}
        </span>
      </div>

      {/* Pointer Arrow */}
      <div className="flex justify-center">
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '8px solid #1C1917',
          }}
        />
      </div>
    </div>
  );
}
