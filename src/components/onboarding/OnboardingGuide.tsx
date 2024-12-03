import React from 'react';
import { Shield, FileText, Lock, Globe2, Sparkles, ArrowRight } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { notificationService } from '../../services/notification';

const steps = [
  {
    title: "Welcome to Ethereus",
    description: "Your journey to smarter contract management starts here! Let's get you set up in just a few steps.",
    icon: Shield,
    tip: "Fun fact: Our platform handles over $100M in digital assets daily!"
  },
  {
    title: "Smart Contracts Made Simple",
    description: "Create legally-binding contracts with AI assistance. No more complex legal jargon!",
    icon: FileText,
    tip: "Did you know? Our AI can generate contract terms in seconds, saving hours of legal work."
  },
  {
    title: "Bank-Grade Security",
    description: "Your contracts are protected by military-grade encryption and blockchain technology.",
    icon: Lock,
    tip: "Sleep easy! Your contracts are more secure than a digital Fort Knox."
  },
  {
    title: "Global Compliance",
    description: "Automatic compliance checks across multiple jurisdictions. We've got you covered worldwide!",
    icon: Globe2,
    tip: "We support legal frameworks in over 30 countries. That's a lot of paperwork handled!"
  }
];

export const OnboardingGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [hasSeenGuide, setHasSeenGuide] = useLocalStorage('hasSeenOnboarding', false);
  const [isOpen, setIsOpen] = React.useState(!hasSeenGuide);

  const handleComplete = () => {
    setHasSeenGuide(true);
    setIsOpen(false);
    notificationService.success("You're all set! Let's create something amazing.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75">
      <div className="bg-slate-800 p-8 rounded-lg max-w-2xl w-full mx-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 blur-3xl" />

        {/* Content */}
        <div className="relative">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-blue-400" })}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">{steps[currentStep].title}</h2>
          <p className="text-gray-300 text-center mb-8">{steps[currentStep].description}</p>

          {/* Fun tip */}
          <div className="bg-slate-700/50 p-4 rounded-lg mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Pro Tip</span>
            </div>
            <p className="text-gray-300">{steps[currentStep].tip}</p>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
              className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleComplete();
                } else {
                  setCurrentStep(prev => prev + 1);
                }
              }}
              className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? "Get Started" : "Next"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Skip button */}
          <button
            onClick={handleComplete}
            className="absolute top-0 right-0 text-gray-400 hover:text-white transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};