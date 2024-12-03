import { authService } from '../services/auth';

describe('Authentication Flow', () => {
  describe('Login', () => {
    test('should login successfully with admin credentials', async () => {
      const user = await authService.login('admin@ethereus.com', 'admin123');
      expect(user).toMatchObject({
        email: 'admin@ethereus.com',
        role: 'admin',
      });
    });

    test('should login successfully with demo credentials', async () => {
      const user = await authService.login('demo@ethereus.com', 'demo123');
      expect(user).toMatchObject({
        email: 'demo@ethereus.com',
        role: 'user',
      });
    });

    test('should throw error with invalid credentials', async () => {
      await expect(
        authService.login('wrong@email.com', 'wrongpass')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('Registration', () => {
    test('should register new user successfully', async () => {
      const user = await authService.register(
        'new@user.com',
        'password123',
        'New User'
      );
      expect(user).toMatchObject({
        email: 'new@user.com',
        name: 'New User',
        role: 'user',
      });
    });
  });

  describe('Authentication State', () => {
    test('should maintain authentication state', () => {
      authService.login('demo@ethereus.com', 'demo123');
      expect(authService.isAuthenticated()).toBe(true);
      
      authService.logout();
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getCurrentUser()).toBeNull();
    });
  });
});