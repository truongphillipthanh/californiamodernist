const contactTypes = [
  { id: 'all', label: 'All' },
  { id: 'client', label: 'Clients' },
  { id: 'internal', label: 'Team' },
  { id: 'contractor', label: 'Contractors' },
  { id: 'agency', label: 'Agencies' },
];

export default function ContactTypeTabs({ activeType, onTypeChange, counts = {} }) {
  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b border-stone-100 overflow-x-auto">
      {contactTypes.map(({ id, label }) => {
        const count = id === 'all' ? counts.total : counts[id] || 0;
        return (
          <button
            key={id}
            onClick={() => onTypeChange(id)}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors
              ${activeType === id
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
              }
            `}
          >
            {label}
            <span className={`
              ml-1.5 text-xs
              ${activeType === id ? 'text-stone-400' : 'text-stone-400'}
            `}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
