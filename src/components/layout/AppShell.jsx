import { Link, Outlet, useLocation } from 'react-router-dom';
import { Map, Users, MessageSquare } from 'lucide-react';

function AppShell() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Header */}
      <header className="bg-stone-900 text-stone-50 border-b border-stone-800">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Logo and Search */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Map className="w-5 h-5" />
            </Link>
            <a
              href="https://www.californiamodernist.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-sm uppercase tracking-wide hover:text-stone-300 transition-colors"
            >
              California Modernist Design
            </a>
            <div className="ml-8">
              <input
                type="search"
                placeholder="Search projects"
                className="bg-stone-800 text-stone-100 px-4 py-2 rounded-sm text-sm border border-stone-700 focus:border-stone-500 focus:outline-none w-64"
              />
            </div>
          </div>

          {/* Right: Navigation Icons */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 transition-colors ${
                isActive('/') ? 'text-stone-50' : 'text-stone-400 hover:text-stone-50'
              }`}
              title="Map"
            >
              <Map className="w-5 h-5" />
            </Link>
            <Link
              to="/crm"
              className={`flex items-center gap-2 transition-colors ${
                isActive('/crm') ? 'text-stone-50' : 'text-stone-400 hover:text-stone-50'
              }`}
              title="CRM"
            >
              <Users className="w-5 h-5" />
            </Link>
            <Link
              to="/project"
              className={`flex items-center gap-2 transition-colors ${
                isActive('/project') ? 'text-stone-50' : 'text-stone-400 hover:text-stone-50'
              }`}
              title="Project"
            >
              <MessageSquare className="w-5 h-5" />
            </Link>
            <div className="ml-4 w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-xs font-mono">
              FT
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;
