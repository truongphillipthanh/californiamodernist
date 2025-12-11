// TASK-C001: CRM full-width default with conditional split view
// TASK-C002/C003: Enhanced detail, ESC key, toggle selection
// TASK-C005: Floating filters for visual consistency with Map page
// TASK-C006: Page header, row density fixes
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Users } from 'lucide-react';
import { getContacts, getContactById } from '../lib/api';
import FloatingFilterBar from '../components/shared/FloatingFilterBar';
import ContactList from '../components/crm/ContactList';
import ContactDetail from '../components/crm/ContactDetail';

// CRM-specific filter configuration
const getCRMFilters = (contacts, typeCounts) => [
  {
    id: 'type',
    label: 'All Types',
    options: [
      { value: 'all', label: 'All Types', count: typeCounts.total || 0 },
      { value: 'client', label: 'Clients', count: typeCounts.client || 0 },
      { value: 'internal', label: 'Team', count: typeCounts.internal || 0 },
      { value: 'contractor', label: 'Contractors', count: typeCounts.contractor || 0 },
      { value: 'agency', label: 'Agencies', count: typeCounts.agency || 0 },
    ]
  },
  {
    id: 'status',
    label: 'All Status',
    options: [
      { value: 'all', label: 'All Status' },
      { value: 'awaiting_us', label: 'Awaiting Us' },
      { value: 'awaiting_them', label: 'Awaiting Them' },
      { value: 'awaiting_third_party', label: 'Awaiting Third Party' },
      { value: 'none', label: 'No Waiting' },
    ]
  },
  {
    id: 'hasProjects',
    label: 'All Contacts',
    options: [
      { value: 'all', label: 'All Contacts' },
      { value: 'with_projects', label: 'With Projects' },
      { value: 'no_projects', label: 'No Projects' },
    ]
  },
];

export default function CRMPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactDetail, setContactDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    hasProjects: 'all',
  });

  // TASK-C001: Track whether detail panel is open
  const isDetailOpen = selectedContact !== null;

  // TASK-C003: ESC key to close detail panel
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape' && selectedContact) {
      setSelectedContact(null);
    }
  }, [selectedContact]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Load contacts
  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  // Load contact detail when selected
  useEffect(() => {
    if (selectedContact) {
      getContactById(selectedContact.id).then(setContactDetail);
    } else {
      setContactDetail(null);
    }
  }, [selectedContact]);

  // TASK-C001: Close handler for detail panel
  const handleCloseDetail = () => {
    setSelectedContact(null);
  };

  // TASK-C003: Toggle selection - clicking same contact closes detail
  const handleSelectContact = (contact) => {
    if (selectedContact?.id === contact.id) {
      setSelectedContact(null);
    } else {
      setSelectedContact(contact);
    }
  };

  // Calculate counts by type
  const typeCounts = useMemo(() => {
    const counts = { total: contacts.length };
    contacts.forEach((c) => {
      counts[c.type] = (counts[c.type] || 0) + 1;
    });
    return counts;
  }, [contacts]);

  // Filter contacts by type, status, projects, and search
  const filteredContacts = useMemo(() => {
    let result = contacts;

    // Filter by type
    if (filters.type !== 'all') {
      result = result.filter((c) => c.type === filters.type);
    }

    // Filter by waiting status
    if (filters.status !== 'all') {
      result = result.filter((c) => {
        if (filters.status === 'none') {
          return !c.waitingStatus || c.waitingStatus === 'none';
        }
        return c.waitingStatus === filters.status;
      });
    }

    // Filter by projects
    if (filters.hasProjects === 'with_projects') {
      result = result.filter((c) => c.projects && c.projects.length > 0);
    } else if (filters.hasProjects === 'no_projects') {
      result = result.filter((c) => !c.projects || c.projects.length === 0);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstName?.toLowerCase().includes(query) ||
          c.lastName?.toLowerCase().includes(query) ||
          c.email?.toLowerCase().includes(query) ||
          c.company?.toLowerCase().includes(query) ||
          c.role?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [contacts, filters, searchQuery]);

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(v => v !== 'all');

  // Clear all filters
  const clearFilters = () => {
    setFilters({ type: 'all', status: 'all', hasProjects: 'all' });
  };

  // Build filter config with current values and change handlers
  const filterConfig = getCRMFilters(contacts, typeCounts).map(f => ({
    ...f,
    value: filters[f.id],
    onChange: (value) => setFilters(prev => ({ ...prev, [f.id]: value })),
  }));

  return (
    <div className="relative h-[calc(100vh-72px)] flex flex-col bg-stone-50">
      {/* TASK-C006: Page Header - matches Map sidebar style */}
      <div className="h-14 flex items-center px-4 border-b border-stone-200 bg-white">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-stone-600" />
          <h1 className="text-sm font-semibold uppercase tracking-wide text-stone-700">
            Contacts
          </h1>
        </div>
      </div>

      {/* TASK-C005: Floating Filter Bar - matches Map page positioning */}
      <div className="absolute top-[72px] left-4 z-20">
        <FloatingFilterBar filters={filterConfig} />
      </div>

      {/* Main Content Area - with top padding for floating filters */}
      <div className="flex flex-1 overflow-hidden pt-12">
        {/* TASK-C001: Contact list - full-width by default, 1/3 when detail open */}
        <div
          className={`
            border-r border-stone-200 bg-white flex flex-col
            transition-all duration-200 ease-in-out
            ${isDetailOpen ? 'w-1/3 min-w-[320px] max-w-[400px]' : 'w-full'}
          `}
        >
          {/* Search bar */}
          <div className="flex-shrink-0 p-4 border-b border-stone-200 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-stone-200 rounded-lg
                           bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>
            {/* Results count */}
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-stone-400">
                {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
                {hasActiveFilters && ' (filtered)'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-stone-500 hover:text-stone-700 underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Contact list */}
          <div className="flex-1 overflow-hidden">
            <ContactList
              contacts={filteredContacts}
              selectedId={selectedContact?.id}
              onSelect={handleSelectContact}
              isCompressed={isDetailOpen}
            />
          </div>
        </div>

        {/* TASK-C001: Right panel - only renders when contact selected */}
        {isDetailOpen && (
          <div className="flex-1 bg-stone-50 transition-all duration-200 ease-in-out">
            <ContactDetail contact={contactDetail} onClose={handleCloseDetail} />
          </div>
        )}
      </div>
    </div>
  );
}
