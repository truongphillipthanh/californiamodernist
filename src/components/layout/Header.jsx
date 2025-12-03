import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Package, Users, MessageSquare, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-stone-200 flex items-center px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left: Home icon + Logo */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className="p-2 hover:bg-stone-100 rounded-md transition-colors"
          aria-label="Home"
        >
          <Home size={20} className="text-stone-600" />
        </NavLink>

        <a
          href="https://www.californiamodernist.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <span className="text-lg font-semibold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
            CMD
          </span>
          <span className="text-sm text-stone-400 hidden sm:inline group-hover:text-stone-500 transition-colors">
            California Modernist Design
          </span>
        </a>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center px-6">
        <div className="relative w-full max-w-[480px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-md text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1 transition-shadow"
          />
        </div>
      </div>

      {/* Right: Feature icons + User */}
      <div className="flex items-center gap-6">
        {/* Feature icons */}
        <nav className="hidden md:flex items-center gap-3">
          {/* Task Manager */}
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `p-2 rounded-md transition-colors ${
                isActive
                  ? 'text-stone-900'
                  : 'text-stone-400 hover:text-stone-600'
              }`
            }
            aria-label="Task Manager"
          >
            <CheckSquare size={20} />
          </NavLink>

          {/* Asset Store */}
          <NavLink
            to="/assets"
            className={({ isActive }) =>
              `p-2 rounded-md transition-colors ${
                isActive
                  ? 'text-stone-900'
                  : 'text-stone-400 hover:text-stone-600'
              }`
            }
            aria-label="Asset Store"
          >
            <Package size={20} />
          </NavLink>

          {/* CRM */}
          <NavLink
            to="/crm"
            className={({ isActive }) =>
              `p-2 rounded-md transition-colors ${
                isActive
                  ? 'text-stone-900'
                  : 'text-stone-400 hover:text-stone-600'
              }`
            }
            aria-label="CRM"
          >
            <Users size={20} />
          </NavLink>

          {/* Communications */}
          <NavLink
            to="/comms"
            className={({ isActive }) =>
              `p-2 rounded-md transition-colors ${
                isActive
                  ? 'text-stone-900'
                  : 'text-stone-400 hover:text-stone-600'
              }`
            }
            aria-label="Communications"
          >
            <MessageSquare size={20} />
          </NavLink>
        </nav>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
          <span className="text-xs font-medium text-stone-600">VM</span>
        </div>
      </div>
    </header>
  );
}
