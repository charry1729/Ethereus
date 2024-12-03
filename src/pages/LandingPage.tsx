import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Globe2, Lock, FileText, Sparkles } from 'lucide-react';
import { DemoAccess } from '../components/DemoAccess';
import { useAuthStore } from '../stores/authStore';

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Smart Contract Generation",
    description: "Create and manage legally binding smart contracts with AI assistance"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade security with multi-signature verification"
  },
  {
    icon: <Globe2 className="w-6 h-6" />,
    title: "Global Compliance",
    description: "Automatic compliance checks across multiple jurisdictions"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI-Powered",
    description: "Advanced AI assistance for contract creation and validation"
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <DemoAccess />

      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg sticky top-12 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Ethereus</span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/documentation')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Documentation
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Enterprise Smart Contract
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                {' '}Management Platform
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 animate-slide-up">
              Transform how you manage, trade, and protect digital assets with enterprise-grade security
              and regulatory compliance across multiple jurisdictions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/documentation')}
                className="border border-gray-700 text-gray-300 px-8 py-4 rounded-lg hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl hover:bg-slate-700/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-3 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full filter blur-3xl" />
      </section>
    </div>
  );
};