import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
    { path: '/admin/logs', label: 'Audit Logs', icon: '📝' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;