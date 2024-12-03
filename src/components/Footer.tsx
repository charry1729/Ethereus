import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">Ethereus</span>
          </div>
          <div className="text-sm text-gray-400">
            © 2024 Ethereus. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};