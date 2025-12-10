// TASK-C001: Close button support
// TASK-C002: Enhanced detail with waiting status, quick actions, project status
import { X, Maximize2, Mail, Phone, Building, Calendar, FileText, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// TASK-C002: Waiting status configuration
const STATUS_COLORS = {
  awaiting_us: { bg: 'bg-amber-500', text: 'text-white', label: 'Waiting on us' },
  awaiting_them: { bg: 'bg-blue-500', text: 'text-white', label: 'Waiting on them' },
  awaiting_third_party: { bg: 'bg-purple-500', text: 'text-white', label: 'Waiting on third party' },
  none: null,
};

// TASK-C002: Project status colors
const PROJECT_STATUS_COLORS = {
  active: 'bg-green-600',
  waiting: 'bg-amber-500',
  blocked: 'bg-red-600',
  complete: 'bg-indigo-500',
  planning: 'bg-blue-500',
  permitting: 'bg-orange-500',
};

const typeColors = {
  client: 'bg-blue-100 text-blue-700',
  internal: 'bg-purple-100 text-purple-700',
  team: 'bg-green-100 text-green-700',
  contractor: 'bg-amber-100 text-amber-700',
  agency: 'bg-green-100 text-green-700',
};

export default function ContactDetail({ contact, onClose }) {
  const navigate = useNavigate();
  const statusConfig = contact?.waitingStatus ? STATUS_COLORS[contact.waitingStatus] : null;

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

  // Support both firstName/lastName and name formats
  const displayName = contact.name || `${contact.firstName} ${contact.lastName}`;
  const initials = contact.name
    ? contact.name.split(' ').map(n => n[0]).join('')
    : `${contact.firstName[0]}${contact.lastName[0]}`;
  const organization = contact.organization || contact.company;

  return (
    <div className="flex flex-col h-full">
      {/* TASK-C002: Header with expand and close buttons */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
        <button
          onClick={() => navigate(`/crm/contact/${contact.id}`)}
          className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded transition-colors"
          title="Open full page"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close contact detail"
            className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Contact Header */}
        <div className="px-6 py-6 border-b border-stone-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
              <span className="text-xl font-medium text-stone-600">
                {initials}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-medium text-stone-900">
                  {displayName}
                </h1>
                <span className={`
                  inline-flex px-2 py-1 rounded text-xs font-medium
                  ${typeColors[contact.type] || 'bg-stone-100 text-stone-600'}
                `}>
                  {contact.type}
                </span>
              </div>
              <p className="text-base text-stone-500">
                {contact.role}
                {organization && (
                  <span className="text-stone-400"> · {organization}</span>
                )}
              </p>
              {contact.department && (
                <p className="text-sm text-stone-400 mt-0.5">{contact.department}</p>
              )}
              {/* TASK-C002: Waiting status badge */}
              {statusConfig && (
                <span className={`
                  inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 rounded-full text-xs font-medium uppercase tracking-wide
                  ${statusConfig.bg} ${statusConfig.text}
                `}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                  {statusConfig.label}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* TASK-C002: Quick Actions */}
        <div className="px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-stone-600
                         bg-stone-100 hover:bg-stone-200 rounded transition-colors"
            >
              <Phone size={14} /> Call
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-stone-600
                         bg-stone-100 hover:bg-stone-200 rounded transition-colors"
            >
              <Mail size={14} /> Email
            </a>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-stone-600
                               bg-stone-100 hover:bg-stone-200 rounded transition-colors">
              <Calendar size={14} /> Schedule
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="px-6 py-4 border-b border-stone-200">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
            Contact
          </h3>
          <div className="space-y-2">
            {/* Emails */}
            {(contact.emails || [contact.email]).filter(Boolean).map((email, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <Mail size={14} className="text-stone-400" />
                <a href={`mailto:${email}`} className="text-stone-700 underline hover:text-stone-900">
                  {email}
                </a>
              </div>
            ))}
            {/* Phones */}
            {(contact.phones || [contact.phone]).filter(Boolean).map((phone, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <Phone size={14} className="text-stone-400" />
                <a href={`tel:${phone}`} className="text-stone-700 hover:text-stone-900">
                  {phone}
                </a>
              </div>
            ))}
            {/* Organization */}
            {organization && (
              <div className="flex items-center gap-3 text-sm">
                <Building size={14} className="text-stone-400" />
                <span className="text-stone-700">{organization}</span>
              </div>
            )}
          </div>
        </div>

        {/* TASK-C002: Projects with status colors */}
        <div className="px-6 py-4 border-b border-stone-200">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
            Projects
          </h3>
          {contact.projects?.length > 0 ? (
            <div className="space-y-2">
              {contact.projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="w-full flex items-center justify-between p-3 bg-stone-50 rounded hover:bg-stone-100 cursor-pointer transition-colors group"
                >
                  <div className="text-left">
                    <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">
                      {project.name}
                    </span>
                    {(project.role || project.isPrimary) && (
                      <p className="text-xs text-stone-500 mt-0.5 capitalize">
                        {project.role?.replace('_', ' ')}
                        {project.isPrimary && (
                          <span className="ml-2 text-xs text-stone-400">• Primary</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`
                      px-2 py-0.5 text-xs font-medium text-white rounded-full uppercase
                      ${PROJECT_STATUS_COLORS[project.status] || 'bg-stone-400'}
                    `}>
                      {project.status}
                    </span>
                    <ExternalLink size={14} className="text-stone-400 group-hover:text-stone-600" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-500">No associated projects</p>
          )}
        </div>

        {/* Notes */}
        <div className="px-6 py-4 border-b border-stone-200">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
            Notes
          </h3>
          <p className="text-sm text-stone-700 leading-relaxed">
            {contact.notes || 'No notes yet'}
          </p>
        </div>

        {/* License info for contractors */}
        {contact.license && (
          <div className="px-6 py-4">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
              License Information
            </h3>
            <div className="p-3 bg-stone-50 rounded">
              <p className="text-xs text-stone-400 uppercase tracking-wide">License Number</p>
              <p className="text-stone-900 mt-1 font-mono">{contact.license}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
