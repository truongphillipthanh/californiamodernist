import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Icon Components
const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DiamondIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3l6 6 6-6M3 12l9 9 9-9M3 12l9-9 9 9" />
  </svg>
);

const ContactsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const MonitorIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const PlusIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMapPage = location.pathname === '/' || location.pathname === '/map';

  return (
    <header className="h-14 bg-white border-b border-stone-200 flex items-center px-4 relative z-50">
      {/* LEFT SECTION: Home + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className={`p-2 rounded-md transition-colors duration-100 ${
            isMapPage
              ? 'text-stone-900 bg-stone-100'
              : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
          }`}
          title="Return to Map"
        >
          <HomeIcon className="w-5 h-5" />
        </button>

        <a
          href="https://www.californiamodernist.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col leading-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-xs font-semibold tracking-wide text-stone-900 uppercase">
            California
          </span>
          <span className="text-xs font-semibold tracking-wide text-stone-900 uppercase">
            Modernist
          </span>
        </a>
      </div>

      {/* CENTER SECTION: Search Bar */}
      <div className="flex-1 flex justify-center px-8">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search projects, address..."
            className="w-full h-9 pl-10 pr-4 bg-stone-100 border border-stone-200 rounded-md
                       text-sm text-stone-700 placeholder:text-stone-400
                       focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent
                       transition-all duration-100"
          />
        </div>
      </div>

      {/* RIGHT SECTION: Feature Icons + New Project + Avatar */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => {}}
          className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors duration-100"
          title="Tasks"
        >
          <CheckIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => {}}
          className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors duration-100"
          title="Assets"
        >
          <DiamondIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('/crm')}
          className={`p-2 rounded-md transition-colors duration-100 ${
            location.pathname === '/crm'
              ? 'text-stone-900 bg-stone-100'
              : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
          }`}
          title="Contacts"
        >
          <ContactsIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('/communications')}
          className={`p-2 rounded-md transition-colors duration-100 ${
            location.pathname === '/communications'
              ? 'text-stone-900 bg-stone-100'
              : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
          }`}
          title="Communications"
        >
          <MonitorIcon className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-stone-200 mx-2" />

        <button
          onClick={() => {}}
          className="flex items-center gap-1.5 h-8 px-3 bg-green-600 hover:bg-green-700
                     text-white text-sm font-medium rounded-md transition-colors duration-100"
        >
          <PlusIcon className="w-4 h-4" />
          <span>NEW PROJECT</span>
        </button>

        <div className="pl-3 pr-4">
          <button
            onClick={() => {}}
            className="w-8 h-8 rounded-md bg-stone-800 text-stone-100
                       text-xs font-semibold flex items-center justify-center
                       hover:bg-stone-700 transition-colors duration-100"
            title="Frank Tapia"
          >
            FT
          </button>
        </div>
      </div>
    </header>
  );
}
