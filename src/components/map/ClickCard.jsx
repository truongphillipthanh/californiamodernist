// ClickCard: Expanded popup on marker click with actions
// Style Guide Part V, Section 5.4

import { ArrowRight } from 'lucide-react';

export default function ClickCard({ project, onViewProject }) {
  const statusStyles = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    complete: 'bg-blue-100 text-blue-700',
    blocked: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 min-w-[280px] max-w-[320px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-medium text-stone-900">{project.name}</h3>
        <span
          className={`
            inline-flex items-center px-2 py-0.5 rounded text-xs font-medium shrink-0
            ${statusStyles[project.status] || 'bg-stone-100 text-stone-700'}
          `}
        >
          {project.status}
        </span>
      </div>

      {/* Address */}
      <p className="text-sm text-stone-500 mb-3">{project.address}</p>

      {/* Metadata */}
      <div className="flex items-center gap-3 mb-4 text-xs text-stone-400">
        <span className="capitalize">{project.type?.replace(/_/g, ' ')}</span>
        <span>•</span>
        <span className="capitalize">{project.phase?.replace(/_/g, ' ')}</span>
      </div>

      {/* Action Button */}
      <button
        onClick={onViewProject}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors text-sm font-medium"
      >
        View Project
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
