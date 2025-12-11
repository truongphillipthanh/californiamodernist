// TASK-C001: Close button support
// TASK-C002: Enhanced detail with waiting status, quick actions, project status
// TASK-C006: 50/50 layout with activity log, circular quick action buttons
import React from 'react';
import { X, Maximize2, Phone, Mail, Calendar } from 'lucide-react';

const STATUS_COLORS = {
  awaiting_us: { bg: 'bg-amber-500', label: 'Waiting on us' },
  awaiting_them: { bg: 'bg-blue-500', label: 'Waiting on them' },
  awaiting_third_party: { bg: 'bg-purple-500', label: 'Waiting on third party' },
};

const PROJECT_STATUS_COLORS = {
  active: 'bg-green-600',
  waiting: 'bg-amber-500',
  blocked: 'bg-red-600',
  complete: 'bg-indigo-500',
};

export default function ContactDetail({ contact, onClose }) {
  if (!contact) return null;

  // Support both firstName/lastName and name formats
  const displayName = contact.name || `${contact.firstName} ${contact.lastName}`;
  const organization = contact.organization || contact.company;
  const statusConfig = STATUS_COLORS[contact.waitingStatus];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-stone-800">{displayName}</h2>
            {statusConfig && (
              <span className={`px-2 py-0.5 text-xs font-medium text-white rounded-full ${statusConfig.bg}`}>
                {statusConfig.label}
              </span>
            )}
          </div>
          <p className="text-sm text-stone-500 mt-1">
            {contact.role} · {organization || '—'}
          </p>
          {contact.lastContact && (
            <p className="text-xs text-stone-400 mt-2">
              Last contact: {contact.lastContact}
            </p>
          )}
        </div>

        <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded">
          <X className="w-5 h-5 text-stone-400" />
        </button>
      </div>

      {/* Quick Actions - Circular buttons */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-200">
        <QuickActionButton icon={Phone} label="Call" />
        <QuickActionButton icon={Mail} label="Email" />
        <QuickActionButton icon={Calendar} label="Schedule" />
      </div>

      {/* Two-Column Body - 50/50 */}
      <div className="flex flex-1 overflow-hidden">
        {/* Info Pane (50%) */}
        <div className="w-1/2 overflow-y-auto p-4 border-r border-stone-200">
          <DetailSection title="CONTACT">
            <div className="space-y-2">
              {(contact.emails || [contact.email]).filter(Boolean).map((email, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-stone-400" />
                  <a href={`mailto:${email}`} className="text-stone-700 hover:underline">{email}</a>
                </div>
              ))}
              {(contact.phones || [contact.phone]).filter(Boolean).map((phone, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-stone-400" />
                  <a href={`tel:${phone}`} className="text-stone-700 hover:underline">{phone}</a>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="PROJECTS">
            {contact.projects?.length > 0 ? (
              <div className="space-y-2">
                {contact.projects.map((proj, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-stone-50 rounded">
                    <span className="text-sm text-stone-700">{proj.name}</span>
                    <span className={`px-2 py-0.5 text-xs text-white rounded-full ${PROJECT_STATUS_COLORS[proj.status] || 'bg-stone-400'}`}>
                      {proj.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">No projects</p>
            )}
          </DetailSection>

          <DetailSection title="NOTES">
            <p className="text-sm text-stone-600">{contact.notes || '—'}</p>
          </DetailSection>
        </div>

        {/* Activity Log (50%) */}
        <div className="w-1/2 overflow-y-auto p-4 bg-stone-50">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-4">
            Activity
          </h3>
          <ActivityLog contact={contact} />
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label }) {
  return (
    <button
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
    >
      <Icon className="w-4 h-4 text-stone-600" />
    </button>
  );
}

function DetailSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ActivityLog({ contact }) {
  // Mock communications data
  const mockComms = [
    {
      id: '1',
      mode: 'email',
      subject: 'Re: Permit Status Update',
      date: 'Nov 22, 2024',
      preview: 'Planning requested additional setback calculations...',
      projectName: 'Miller Residence',
    },
    {
      id: '2',
      mode: 'phone',
      subject: 'Call re: timeline',
      date: 'Nov 20, 2024',
      duration: '12 min',
      preview: 'Discussed timeline for planning approval...',
    },
    {
      id: '3',
      mode: 'meeting',
      subject: 'Site Visit',
      date: 'Nov 15, 2024',
      duration: '45 min',
      preview: 'Walked through foundation prep...',
      projectName: 'Chen Estate',
    },
  ];

  const modeIcons = { email: '✉', phone: '📞', meeting: '📅' };

  return (
    <div className="space-y-3">
      {mockComms.map((comm) => (
        <div key={comm.id} className="p-3 bg-white rounded border border-stone-200 hover:border-stone-300 cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-sm">
              {modeIcons[comm.mode]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-800 truncate">{comm.subject}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                <span>{comm.date}</span>
                {comm.duration && <><span>·</span><span>{comm.duration}</span></>}
                {comm.projectName && <><span>·</span><span className="text-stone-500">{comm.projectName}</span></>}
              </div>
              <p className="text-sm text-stone-500 mt-2 line-clamp-2">{comm.preview}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
