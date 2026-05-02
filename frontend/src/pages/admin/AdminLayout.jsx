import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin',            label: 'Dashboard',          icon: '📊', exact: true },
  { to: '/admin/photos',     label: 'Manage Photos',      icon: '🖼️' },
  { to: '/admin/categories', label: 'Manage Categories',  icon: '📂' },
  { to: '/admin/profile',    label: 'Manage Profile',     icon: '👤' },
];

export default function AdminLayout({ children, title }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/admin/login');
  };

  const isActive = (item) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  const Sidebar = () => (
    <aside className="w-56 bg-dark-2 border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-serif text-2xl font-bold gold-gradient tracking-widest">VJ</span>
          <span className="text-[8px] tracking-[0.4em] text-gray-600 uppercase mt-0.5">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs transition-all duration-200 ${
                  isActive(item)
                    ? 'bg-gold/10 text-gold border-l-2 border-gold'
                    : 'text-gray-500 hover:text-white hover:bg-white/4 border-l-2 border-transparent'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="tracking-wide">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-white/5">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          <span>🌐</span>
          <span>View Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-gray-600 hover:text-red-400 transition-colors"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-56">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-dark-2 border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-500 hover:text-white p-1"
          >
            ☰
          </button>
          <h1 className="text-sm font-medium text-white tracking-wide flex-1">{title}</h1>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
