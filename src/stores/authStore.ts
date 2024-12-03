import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

// Demo users for testing
const DEMO_USERS = {
  admin: {
    email: 'admin@ethereus.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  user: {
    email: 'demo@ethereus.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'user' as const,
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check demo credentials
        const adminUser = DEMO_USERS.admin;
        const demoUser = DEMO_USERS.user;

        if (email === adminUser.email && password === adminUser.password) {
          set({
            user: { id: 'admin-1', ...adminUser },
            isAuthenticated: true,
          });
          return;
        }

        if (email === demoUser.email && password === demoUser.password) {
          set({
            user: { id: 'user-1', ...demoUser },
            isAuthenticated: true,
          });
          return;
        }

        throw new Error('Invalid credentials');
      },
      register: async (email: string, password: string, name: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // For demo purposes, create a new user
        set({
          user: {
            id: `user-${Date.now()}`,
            email,
            name,
            role: 'user',
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);