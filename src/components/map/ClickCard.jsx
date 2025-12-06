// ClickCard: Zillow-style centered modal on marker click
// Style Guide Part V, Section 5.4
// TASK-054: Full modal with gallery, stats, details

import { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function ClickCard({ project, onClose, onViewProject }) {
  if (!project) return null;

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const statusColors = {
    blocked: 'bg-red-100 text-red-700',
    pending: 'bg-amber-100 text-amber-700',
    active: 'bg-green-100 text-green-700',
    complete: 'bg-blue-100 text-blue-700',
  };

  const formatType = (type) => {
    if (!type) return '—';
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const formatPhase = (phase) => {
    if (!phase) return '—';
    return phase.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[500]"
        onClick={onClose}
      />

      {/* Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[90%] max-w-[720px] max-h-[85vh]
                      bg-white rounded-2xl shadow-2xl overflow-hidden z-[510]
                      flex flex-col animate-in fade-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white
                     shadow-md flex items-center justify-center z-10
                     hover:scale-105 transition-transform"
        >
          <X size={16} className="text-stone-600" />
        </button>

        {/* Gallery Grid */}
        <div className="grid grid-cols-[2fr_1fr] gap-1 h-[280px] shrink-0">
          <div className="bg-stone-100 flex items-center justify-center">
            {project.heroImage ? (
              <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">🏠</div>
                <span className="text-stone-400 text-sm">No image available</span>
              </div>
            )}
          </div>
          <div className="grid grid-rows-2 gap-1">
            <div className="bg-stone-200/50 flex items-center justify-center">
              <span className="text-stone-300 text-xs">+ Photo</span>
            </div>
            <div className="bg-stone-200/50 flex items-center justify-center">
              <span className="text-stone-300 text-xs">+ Photo</span>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-8 overflow-y-auto flex-1">
          {/* Header */}
          <div className="pb-6 mb-6 border-b border-stone-200">
            <h1 className="text-2xl font-semibold text-stone-900 tracking-tight mb-1">
              {project.name}
            </h1>
            <p className="text-stone-500 mb-3">
              {project.address || 'Malibu, CA'}
            </p>
            <div className="flex gap-2">
              <span className={`
                px-3 py-1 rounded-md font-mono text-xs font-bold uppercase tracking-wide
                ${statusColors[project.status] || 'bg-stone-100 text-stone-700'}
              `}>
                {project.status}
              </span>
              <span className="px-3 py-1 bg-stone-900 text-white rounded-md font-mono text-xs font-bold uppercase tracking-wide">
                {formatPhase(project.phase)}
              </span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex gap-6 bg-stone-50 p-5 rounded-xl mb-6">
            <div className="text-center flex-1">
              <div className="font-mono text-2xl font-bold text-stone-900">
                {project.daysInPhase || '—'}
              </div>
              <div className="text-xs uppercase tracking-wide text-stone-500 mt-1">Days in Phase</div>
            </div>
            <div className="text-center flex-1">
              <div className="font-mono text-2xl font-bold text-stone-900">
                {project.agenciesApproved || 0}/{project.agenciesTotal || 0}
              </div>
              <div className="text-xs uppercase tracking-wide text-stone-500 mt-1">Agencies</div>
            </div>
            <div className="text-center flex-1">
              <div className="font-mono text-2xl font-bold text-stone-900">
                {project.completion || 0}%
              </div>
              <div className="text-xs uppercase tracking-wide text-stone-500 mt-1">Complete</div>
            </div>
            <div className="text-center flex-1">
              <div className="font-mono text-2xl font-bold text-stone-900">
                {project.squareFootage?.toLocaleString() || '—'}
              </div>
              <div className="text-xs uppercase tracking-wide text-stone-500 mt-1">Sq Ft</div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-400 mb-3">
                Project Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Type</span>
                  <span className="text-stone-900 font-medium">{formatType(project.type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Phase</span>
                  <span className="text-stone-900 font-medium">{formatPhase(project.phase)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">ID</span>
                  <span className="text-stone-900 font-medium font-mono text-sm">{project.id}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-400 mb-3">
                Location
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Zone</span>
                  <span className="text-stone-900 font-medium">
                    {project.zones?.length > 0 ? project.zones.map(z => z.charAt(0).toUpperCase() + z.slice(1)).join(', ') : '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Address</span>
                  <span className="text-stone-900 font-medium text-right text-sm">
                    {project.address || '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blocker (if exists) */}
          {project.blocker && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
              <div className="text-xs font-bold uppercase tracking-wide text-red-600 mb-1 flex items-center gap-1">
                <span>⊘</span> Blocker
              </div>
              <p className="text-sm text-red-800">{project.blocker}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onViewProject}
              className="flex-1 py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              View Full Project
              <ArrowRight size={16} />
            </button>
            <button className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg font-medium hover:bg-stone-50 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
