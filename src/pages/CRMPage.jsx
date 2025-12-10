// TASK-C001: CRM full-width default with conditional split view
// TASK-C002/C003: Enhanced detail, ESC key, toggle selection
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getContacts, getContactById } from '../lib/api';
import ContactTypeTabs from '../components/crm/ContactTypeTabs';
import ContactList from '../components/crm/ContactList';
import ContactDetail from '../components/crm/ContactDetail';

export default function CRMPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactDetail, setContactDetail] = useState(null);
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter contacts by type and search
  const filteredContacts = useMemo(() => {
    let result = contacts;

    // Filter by type
    if (activeType !== 'all') {
      result = result.filter((c) => c.type === activeType);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstName.toLowerCase().includes(query) ||
          c.lastName.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.company?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [contacts, activeType, searchQuery]);

  return (
    <div className="h-[calc(100vh-72px)] flex">
      {/* TASK-C001: Contact list - full-width by default, 1/3 when detail open */}
      <div
        className={`
          border-r border-stone-200 bg-white flex flex-col
          transition-all duration-200 ease-in-out
          ${isDetailOpen ? 'w-1/3 min-w-[320px] max-w-[400px]' : 'w-full'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-200">
          <h1 className="text-xl font-semibold text-stone-900">Contacts</h1>
        </div>

        {/* Type tabs */}
        <ContactTypeTabs
          activeType={activeType}
          onTypeChange={setActiveType}
          counts={typeCounts}
        />

        {/* Contact list */}
        <div className="flex-1 overflow-hidden">
          <ContactList
            contacts={filteredContacts}
            selectedId={selectedContact?.id}
            onSelect={handleSelectContact}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
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
  );
}
