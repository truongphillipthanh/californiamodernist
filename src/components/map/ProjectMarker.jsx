// TASK-033: Inverted colors (light bg, dark text) + increased padding
// TASK-S012: Color inversion on emphasis - dark bg/light text when hovered
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
  const scale = isEmphasized ? 1.1 : 1;

  // TASK-S012: Invert colors on emphasis
  // Default: light background (#FAFAF9), dark text (#1C1917)
  // Emphasized: dark background (#1C1917), light text (#FAFAF9), status color ring
  const bgColor = isEmphasized ? '#1C1917' : '#FAFAF9';
  const textColor = isEmphasized ? '#FAFAF9' : '#1C1917';
  const arrowColor = isEmphasized ? '#1C1917' : '#FAFAF9';

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
        transition: 'all 100ms ease-out',
      }}
    >
      {/* Marker Body - TASK-S012: Invert colors on emphasis */}
      <div
        className="flex items-center justify-center gap-2"
        style={{
          backgroundColor: bgColor,
          padding: '10px 14px',
          borderRadius: '4px',
          border: isEmphasized ? 'none' : '1px solid #E7E5E4',
          boxShadow: isEmphasized
            ? `0 0 0 2px ${statusColor}, 0 4px 12px rgba(0,0,0,0.15)`
            : '0 2px 6px rgba(0,0,0,0.1)',
          transition: 'all 100ms ease-out',
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
            transition: 'all 100ms ease-out',
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
            color: textColor,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            transition: 'color 100ms ease-out',
          }}
        >
          {displayName}
        </span>
      </div>

      {/* Pointer Arrow - TASK-S012: Updated to match inverted state */}
      <div className="flex justify-center">
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `8px solid ${arrowColor}`,
            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
            transition: 'border-top-color 100ms ease-out',
          }}
        />
      </div>
    </div>
  );
}
