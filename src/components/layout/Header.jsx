// Header - Main application header
// Style Guide Part III (Typography), Part VII (Interactions)
// Layout: Hamburger | Stacked Logo | Search | "+ NEW PROJECT" | Avatar

import { Menu, Search, Plus } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="h-16 bg-white border-b border-stone-200 flex items-center px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left: Hamburger + Stacked Logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-stone-100 rounded-md transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-stone-600" />
        </button>

        {/* Stacked logo */}
        <a
          href="https://www.californiamodernist.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col leading-tight group"
          style={{
            fontFamily: '"SF Compact Display", "Roboto Condensed", "Segoe UI", "Bebas Neue", sans-serif',
          }}
        >
          <span className="text-base font-medium tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors uppercase">
            California
          </span>
          <span className="text-base font-medium tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors uppercase">
            Modernist
          </span>
        </a>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center px-6">
        <div className="relative w-full max-w-[400px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search projects, address..."
            className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-md text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1 transition-shadow"
          />
        </div>
      </div>

      {/* Right: "+ NEW PROJECT" button + Avatar */}
      <div className="flex items-center gap-4">
        {/* New Project button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white text-sm font-medium rounded-md hover:bg-stone-900 transition-colors">
          <Plus size={16} />
          <span>NEW PROJECT</span>
        </button>

        {/* User avatar with 16px right margin */}
        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center mr-4">
          <span className="text-xs font-medium text-stone-600">FT</span>
        </div>
      </div>
    </header>
  );
}
