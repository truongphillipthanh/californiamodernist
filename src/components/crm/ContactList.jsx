import { Search } from 'lucide-react';

export default function ContactList({
  contacts,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
}) {
  const typeColors = {
    client: 'bg-blue-100 text-blue-700',
    internal: 'bg-purple-100 text-purple-700',
    contractor: 'bg-amber-100 text-amber-700',
    agency: 'bg-green-100 text-green-700',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-stone-100">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-100 border-0 rounded-md text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1"
          />
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto">
        {contacts.length > 0 ? (
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <button
                  onClick={() => onSelect(contact)}
                  className={`
                    w-full text-left px-4 py-3 border-b border-stone-100 transition-colors
                    ${selectedId === contact.id
                      ? 'bg-stone-100'
                      : 'hover:bg-stone-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                      <span className="text-sm font-medium text-stone-600">
                        {contact.firstName[0]}{contact.lastName[0]}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-stone-900 truncate">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <span className={`
                          inline-flex px-1.5 py-0.5 rounded text-xs font-medium shrink-0
                          ${typeColors[contact.type] || 'bg-stone-100 text-stone-600'}
                        `}>
                          {contact.type}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 truncate mt-0.5">
                        {contact.company || contact.email}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-stone-400 text-sm">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
}
