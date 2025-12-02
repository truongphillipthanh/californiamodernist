import { NavLink } from 'react-router-dom';
import { Map, Users, Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-stone-100 rounded-md transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={20} className="text-stone-600" />
        </button>
        <span className="text-lg font-semibold tracking-tight text-stone-900">
          CMD
        </span>
        <span className="text-sm text-stone-400 hidden sm:inline">
          California Modernist Design
        </span>
      </div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`
          }
        >
          <Map size={16} />
          Projects
        </NavLink>
        <NavLink
          to="/crm"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`
          }
        >
          <Users size={16} />
          Contacts
        </NavLink>
      </nav>

      {/* Right: User Menu Placeholder */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
          <span className="text-xs font-medium text-stone-600">VM</span>
        </div>
      </div>
    </header>
  );
}
