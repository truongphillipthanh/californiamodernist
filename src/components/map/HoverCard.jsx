// HoverCard: Minimal popup on marker hover
// Style Guide Part V, Section 5.3

export default function HoverCard({ project }) {
  const statusStyles = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    complete: 'bg-blue-100 text-blue-700',
    blocked: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 min-w-[200px] max-w-[280px]">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-stone-900 text-sm">{project.name}</h4>
        <span
          className={`
            inline-flex items-center px-2 py-0.5 rounded text-xs font-medium shrink-0
            ${statusStyles[project.status] || 'bg-stone-100 text-stone-700'}
          `}
        >
          {project.status}
        </span>
      </div>
      <p className="text-xs text-stone-500 mt-1">{project.address}</p>
    </div>
  );
}
