import { useState, useEffect, useMemo } from 'react';
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
      {/* Left panel: Contact list (1/3) */}
      <div className="w-1/3 min-w-[320px] max-w-[400px] border-r border-stone-200 bg-white flex flex-col">
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
            onSelect={setSelectedContact}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>

      {/* Right panel: Contact detail (2/3) */}
      <div className="flex-1 bg-stone-50">
        <ContactDetail contact={contactDetail} />
      </div>
    </div>
  );
}
