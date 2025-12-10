// TASK-C004: Communications page scaffold (Gmail + Internal messaging)
import { useState } from 'react';
import { MessageSquare, Users, Ticket, Bell, Hash, Lock } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'channels', label: 'Channels', icon: Hash },
  { id: 'dms', label: 'Direct Messages', icon: Users },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'notifications', label: 'Activity', icon: Bell },
];

export default function CommsPage() {
  const [gmailConnected, setGmailConnected] = useState(false);
  const [activeSection, setActiveSection] = useState('channels');

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-stone-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-stone-200">
        <h1 className="text-xl font-semibold text-stone-800">Communications</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Gmail Section (2/3) */}
        <div className="w-2/3 border-r border-stone-200 bg-white flex flex-col">
          <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📧</span>
              <span className="font-medium text-stone-700">Gmail</span>
            </div>
            {gmailConnected && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Connected
              </span>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            {gmailConnected ? (
              <div className="w-full max-w-2xl">
                <div className="space-y-2">
                  {/* Mock emails */}
                  {[
                    { from: 'Maria Santos', subject: 'RE: Miller Residence setback variance', time: '10:32 AM', unread: true },
                    { from: 'Michael Rodriguez', subject: 'Structural calcs ready for review', time: '9:15 AM', unread: true },
                    { from: 'Sarah Miller', subject: 'Question about timeline', time: 'Yesterday', unread: false },
                    { from: 'City of Malibu', subject: 'Permit fee invoice #2024-1847', time: 'Yesterday', unread: false },
                    { from: 'Coastal Commission', subject: 'CDP Application Status Update', time: 'Nov 20', unread: false },
                  ].map((email, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded cursor-pointer transition-colors ${
                        email.unread ? 'bg-blue-50 hover:bg-blue-100' : 'bg-white hover:bg-stone-50'
                      } border border-stone-200`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${email.unread ? 'font-semibold text-stone-900' : 'text-stone-700'}`}>
                          {email.from}
                        </span>
                        <span className="text-xs text-stone-400">{email.time}</span>
                      </div>
                      <p className={`text-sm ${email.unread ? 'font-medium text-stone-800' : 'text-stone-600'}`}>
                        {email.subject}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-stone-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📧</span>
                </div>
                <h2 className="text-lg font-medium text-stone-800 mb-2">
                  Connect Gmail
                </h2>
                <p className="text-sm text-stone-500 mb-4 max-w-sm">
                  View and manage project-related emails directly in CMD.
                  Your emails stay private and secure.
                </p>
                <button
                  onClick={() => setGmailConnected(true)}
                  className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded
                             hover:bg-stone-800 transition-colors"
                >
                  Connect Gmail Account
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Internal Messaging Section (1/3) */}
        <div className="w-1/3 bg-white flex flex-col">
          {/* Nav */}
          <div className="flex border-b border-stone-200">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                <item.icon className="w-4 h-4 mx-auto mb-1" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeSection === 'channels' && <ChannelsSection />}
            {activeSection === 'dms' && <DMsSection />}
            {activeSection === 'tickets' && <TicketsSection />}
            {activeSection === 'notifications' && <NotificationsSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelsSection() {
  const channels = [
    { id: 1, name: 'general', isPrivate: false, unread: 2 },
    { id: 2, name: 'permits', isPrivate: false, unread: 0 },
    { id: 3, name: 'miller-residence', isPrivate: true, unread: 5 },
    { id: 4, name: 'chen-estate', isPrivate: true, unread: 0 },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-stone-700">Channels</h3>
        <button className="text-xs text-stone-500 hover:text-stone-700">+ New</button>
      </div>
      <div className="space-y-1">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="flex items-center justify-between px-3 py-2 rounded hover:bg-stone-50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {channel.isPrivate ? (
                <Lock className="w-3 h-3 text-stone-400" />
              ) : (
                <Hash className="w-3 h-3 text-stone-400" />
              )}
              <span className="text-sm text-stone-700">{channel.name}</span>
            </div>
            {channel.unread > 0 && (
              <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full">
                {channel.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DMsSection() {
  const conversations = [
    { id: 1, name: 'Frank Tapia', status: 'online', lastMessage: 'Got it, thanks!', time: '2m' },
    { id: 2, name: 'Vitus Mataré', status: 'offline', lastMessage: 'Let me check the drawings', time: '1h' },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-stone-700">Direct Messages</h3>
        <button className="text-xs text-stone-500 hover:text-stone-700">+ New</button>
      </div>
      <div className="space-y-2">
        {conversations.map((convo) => (
          <div
            key={convo.id}
            className="flex items-center gap-3 p-2 rounded hover:bg-stone-50 cursor-pointer"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                <span className="text-xs font-medium text-stone-500">
                  {convo.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                convo.status === 'online' ? 'bg-green-500' : 'bg-stone-300'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700">{convo.name}</span>
                <span className="text-xs text-stone-400">{convo.time}</span>
              </div>
              <p className="text-xs text-stone-500 truncate">{convo.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TicketsSection() {
  const tickets = [
    { id: 'T-042', title: 'Update Chen Estate fire flow calcs', priority: 'high', status: 'in_progress' },
    { id: 'T-041', title: 'Request Will Serve letter', priority: 'medium', status: 'todo' },
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-stone-100 text-stone-600',
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-stone-700">Your Tickets</h3>
        <button className="text-xs text-stone-500 hover:text-stone-700">+ New</button>
      </div>
      <div className="space-y-2">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="p-3 border border-stone-200 rounded hover:bg-stone-50 cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-stone-400 font-mono">{ticket.id}</span>
              <span className={`px-1.5 py-0.5 text-xs rounded ${priorityColors[ticket.priority]}`}>
                {ticket.priority}
              </span>
            </div>
            <p className="text-sm text-stone-700">{ticket.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsSection() {
  const notifications = [
    { id: 1, text: 'Vitus commented on Miller Residence', time: '10m ago', unread: true },
    { id: 2, text: 'Frank mentioned you in #permits', time: '1h ago', unread: true },
    { id: 3, text: 'Chen Estate moved to Plan Check', time: '2h ago', unread: false },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-stone-700">Activity</h3>
        <button className="text-xs text-stone-500 hover:text-stone-700">Mark all read</button>
      </div>
      <div className="space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded cursor-pointer ${
              notif.unread ? 'bg-blue-50' : 'hover:bg-stone-50'
            }`}
          >
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className={`text-sm ${notif.unread ? 'font-medium text-stone-800' : 'text-stone-600'}`}>
                  {notif.text}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">{notif.time}</p>
              </div>
              {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
