import React from 'react';
import { Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">Ethereus</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-blue-400 transition-colors">Solutions</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Unlocking the Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {' '}Asset Tokenization
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Transform how you manage, trade, and protect digital assets with enterprise-grade security
            and regulatory compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg flex items-center justify-center transition-colors">
              Start Free Trial
            </button>
            <button className="border border-gray-500 hover:border-blue-400 px-8 py-3 rounded-lg transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 blur-3xl"></div>
      </div>
    </header>
  );
};