// TASK-C001: Added close button support
import { Mail, Phone, Building, FileText, ExternalLink, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactDetail({ contact, onClose }) {
  const navigate = useNavigate();

  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center text-stone-400">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
            <FileText size={24} className="text-stone-300" />
          </div>
          <p>Select a contact to view details</p>
        </div>
      </div>
    );
  }

  const typeColors = {
    client: 'bg-blue-100 text-blue-700',
    internal: 'bg-purple-100 text-purple-700',
    contractor: 'bg-amber-100 text-amber-700',
    agency: 'bg-green-100 text-green-700',
  };

  return (
    <div className="h-full overflow-y-auto relative">
      {/* TASK-C001: Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                     text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
          aria-label="Close detail panel"
        >
          <X size={20} />
        </button>
      )}

      <div className="p-6">
        {/* Header card */}
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="flex items-start gap-4">
            {/* Large avatar */}
            <div className="w-20 h-20 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
              <span className="text-2xl font-medium text-stone-600">
                {contact.firstName[0]}{contact.lastName[0]}
              </span>
            </div>

            {/* Name and type */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-stone-900">
                  {contact.firstName} {contact.lastName}
                </h1>
                <span className={`
                  inline-flex px-2 py-1 rounded text-xs font-medium
                  ${typeColors[contact.type] || 'bg-stone-100 text-stone-600'}
                `}>
                  {contact.type}
                </span>
              </div>

              {contact.company && (
                <p className="text-stone-500 mt-1 flex items-center gap-2">
                  <Building size={14} />
                  {contact.company}
                </p>
              )}

              {contact.role && (
                <p className="text-sm text-stone-400 mt-0.5">{contact.role}</p>
              )}

              {contact.department && (
                <p className="text-sm text-stone-400">{contact.department}</p>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Mail size={18} className="text-stone-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Email</p>
                <p className="text-sm text-stone-900 group-hover:text-blue-600 transition-colors">
                  {contact.email}
                </p>
              </div>
            </a>

            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Phone size={18} className="text-stone-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Phone</p>
                <p className="text-sm text-stone-900 group-hover:text-blue-600 transition-colors">
                  {contact.phone}
                </p>
              </div>
            </a>
          </div>

          {/* Notes */}
          {contact.notes && (
            <div className="mt-6 p-4 bg-stone-50 rounded-lg">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">Notes</p>
              <p className="text-sm text-stone-700 leading-relaxed">{contact.notes}</p>
            </div>
          )}
        </div>

        {/* Associated projects */}
        {contact.projects?.length > 0 && (
          <div className="mt-6 bg-white rounded-lg border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              Associated Projects
            </h2>
            <ul className="space-y-2">
              {contact.projects.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="w-full flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-stone-900 group-hover:text-stone-700">
                        {project.name}
                      </p>
                      <p className="text-sm text-stone-500 mt-0.5 capitalize">
                        {project.role?.replace('_', ' ')}
                        {project.isPrimary && (
                          <span className="ml-2 text-xs text-stone-400">• Primary</span>
                        )}
                      </p>
                    </div>
                    <ExternalLink size={16} className="text-stone-400 group-hover:text-stone-600" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* License info for contractors */}
        {contact.license && (
          <div className="mt-6 bg-white rounded-lg border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              License Information
            </h2>
            <div className="p-4 bg-stone-50 rounded-lg">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">License Number</p>
              <p className="text-stone-900 mt-1 font-mono">{contact.license}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
