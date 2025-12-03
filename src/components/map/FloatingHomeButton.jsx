// FloatingHomeButton - Floating home button on map (left side, adjacent to sidebar)
// Style Guide Part VII (Interaction Patterns)
// Position: top: 80px, left: 16px
// Hidden when sidebar is open

import { NavLink } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function FloatingHomeButton({ sidebarOpen }) {
  if (sidebarOpen) return null;

  return (
    <NavLink
      to="/"
      className="fixed top-20 left-4 z-30 p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Home"
    >
      <Home size={20} className="text-stone-600" />
    </NavLink>
  );
}
