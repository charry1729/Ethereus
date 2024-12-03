import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { notificationService } from '../services/notification';

const DEMO_CREDENTIALS = {
  email: 'demo@ethereus.com',
  password: 'demo123',
};

export const DemoAccess: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDemoAccess = async () => {
    setIsLoading(true);
    try {
      await login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
      notificationService.success('Welcome to the demo! Explore our platform features.');
      navigate('/dashboard');
    } catch (error) {
      notificationService.error('Failed to access demo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-2">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <button
            onClick={handleDemoAccess}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Accessing Demo...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Try Demo Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};