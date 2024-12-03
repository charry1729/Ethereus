import React from 'react';
import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Shield className="w-12 h-12 text-blue-400" />
          <span className="text-3xl font-bold text-white">Ethereus</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;