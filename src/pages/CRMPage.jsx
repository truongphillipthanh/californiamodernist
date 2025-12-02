import { useState, useEffect } from 'react';
import { getContacts, getContactById } from '../lib/api';

export default function CRMPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactDetail, setContactDetail] = useState(null);

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  useEffect(() => {
    if (selectedContact) {
      getContactById(selectedContact.id).then(setContactDetail);
    }
  }, [selectedContact]);

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Left panel: Contact list (1/3) */}
      <div className="w-1/3 border-r border-stone-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-stone-100">
          <h2 className="text-lg font-semibold text-stone-900">Contacts</h2>
          <p className="text-sm text-stone-500 mt-1">{contacts.length} total</p>
        </div>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <button
                onClick={() => setSelectedContact(contact)}
                className={`
                  w-full text-left px-4 py-3 border-b border-stone-100 transition-colors
                  ${selectedContact?.id === contact.id
                    ? 'bg-stone-100'
                    : 'hover:bg-stone-50'
                  }
                `}
              >
                <p className="font-medium text-stone-900">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-sm text-stone-500">{contact.company || contact.type}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right panel: Contact detail (2/3) */}
      <div className="flex-1 bg-stone-50 overflow-y-auto">
        {contactDetail ? (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center">
                  <span className="text-xl font-medium text-stone-600">
                    {contactDetail.firstName[0]}{contactDetail.lastName[0]}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-stone-900">
                    {contactDetail.firstName} {contactDetail.lastName}
                  </h1>
                  <p className="text-stone-500">{contactDetail.company || contactDetail.type}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Email</p>
                  <p className="text-stone-900 mt-1">{contactDetail.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Phone</p>
                  <p className="text-stone-900 mt-1">{contactDetail.phone}</p>
                </div>
              </div>

              {contactDetail.notes && (
                <div className="mt-6">
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Notes</p>
                  <p className="text-stone-700 mt-1">{contactDetail.notes}</p>
                </div>
              )}

              {contactDetail.projects?.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">Projects</p>
                  <ul className="space-y-2">
                    {contactDetail.projects.map((project) => (
                      <li
                        key={project.id}
                        className="flex items-center justify-between p-3 bg-stone-50 rounded-md"
                      >
                        <span className="font-medium text-stone-900">{project.name}</span>
                        <span className="text-sm text-stone-500">{project.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-stone-400">
            Select a contact to view details
          </div>
        )}
      </div>
    </div>
  );
}
