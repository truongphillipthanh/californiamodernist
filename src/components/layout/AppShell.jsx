import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppShell({ showSidebar = true, sidebarContent = null }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {showSidebar && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          {sidebarContent}
        </Sidebar>
      )}

      {/* Main content area */}
      <main
        className={`
          pt-16 min-h-screen
          ${showSidebar ? 'lg:pl-[380px]' : ''}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
