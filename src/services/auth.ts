import { storageService } from './storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo users
    const users = {
      admin: {
        id: 'admin-1',
        email: 'admin@ethereus.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin' as const,
      },
      demo: {
        id: 'user-1',
        email: 'demo@ethereus.com',
        password: 'demo123',
        name: 'Demo User',
        role: 'user' as const,
      },
    };

    // Check credentials
    const user = Object.values(users).find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = btoa(`${user.email}:${Date.now()}`);
    
    // Store auth data
    storageService.set(TOKEN_KEY, token);
    storageService.set(USER_KEY, user);

    const { password: _, ...userData } = user;
    return userData;
  },

  async register(email: string, password: string, name: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user' as const,
    };

    // Store auth data
    const token = btoa(`${email}:${Date.now()}`);
    storageService.set(TOKEN_KEY, token);
    storageService.set(USER_KEY, user);

    return user;
  },

  logout(): void {
    storageService.remove(TOKEN_KEY);
    storageService.remove(USER_KEY);
  },

  getCurrentUser(): User | null {
    return storageService.get(USER_KEY);
  },

  isAuthenticated(): boolean {
    return !!storageService.get(TOKEN_KEY);
  },

  getToken(): string | null {
    return storageService.get(TOKEN_KEY);
  },
};