// TASK-C001: Support compressed (split) and full-width modes
// TASK-C005: Search moved to CRMPage with floating filters
import { MessageSquare, Phone, Mail } from 'lucide-react';

export default function ContactList({
  contacts,
  selectedId,
  onSelect,
  isCompressed = false,
}) {
  const typeColors = {
    client: 'bg-blue-100 text-blue-700',
    internal: 'bg-purple-100 text-purple-700',
    contractor: 'bg-amber-100 text-amber-700',
    agency: 'bg-green-100 text-green-700',
  };

  return (
    <div className="flex flex-col h-full">
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
                      ? 'bg-stone-200'
                      : 'hover:bg-stone-50'
                    }
                  `}
                >
                  {isCompressed ? (
                    /* COMPRESSED VIEW (Split mode - 1/3 width) */
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
                  ) : (
                    /* FULL VIEW (Default - full width) */
                    <div className="flex items-start justify-between">
                      {/* Left: Avatar + 3-line stack */}
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                          <span className="text-base font-medium text-stone-600">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </span>
                        </div>

                        {/* Info stack */}
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium text-stone-800">
                              {contact.firstName} {contact.lastName}
                            </span>
                            <span className={`
                              inline-flex px-1.5 py-0.5 rounded text-xs font-medium
                              ${typeColors[contact.type] || 'bg-stone-100 text-stone-600'}
                            `}>
                              {contact.type}
                            </span>
                          </div>
                          <span className="text-sm text-stone-600">
                            {contact.role || contact.type}
                          </span>
                          <span className="text-sm text-stone-500">
                            {contact.company || '—'}
                          </span>
                        </div>
                      </div>

                      {/* Right: Icon counts */}
                      <div className="flex items-center gap-4 text-stone-400">
                        <div className="flex items-center gap-1">
                          <MessageSquare size={14} />
                          <span className="text-xs">{contact.messageCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={14} />
                          <span className="text-xs">{contact.phones?.length || 1}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          <span className="text-xs">{contact.emails?.length || 1}</span>
                        </div>
                      </div>
                    </div>
                  )}
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
