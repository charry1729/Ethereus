import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, Package, FileText, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { WalletConnect } from '../components/wallet/WalletConnect';

export const DashboardLayout: React.FC = () => {
  const { logout, user } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user,
  }));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-bold text-white">Ethereus</span>
        </div>

        <div className="mb-8 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-slate-700'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/assets"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-slate-700'
              }`
            }
          >
            <Package className="w-5 h-5" />
            <span>Assets</span>
          </NavLink>

          <NavLink
            to="/contracts"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-slate-700'
              }`
            }
          >
            <FileText className="w-5 h-5" />
            <span>Contracts</span>
          </NavLink>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-4">
          <WalletConnect />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full p-2 text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};