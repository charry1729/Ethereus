import { setupCache } from 'axios-cache-adapter';

// Cache configuration
export const cache = setupCache({
  maxAge: 15 * 60 * 1000, // Cache for 15 minutes
  exclude: {
    query: false,
    methods: ['post', 'patch', 'put', 'delete'],
  },
});

// Contract template caching
export const templateCache = {
  async get(key: string): Promise<any> {
    const cached = localStorage.getItem(`template_${key}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) { // 24 hours
        return data;
      }
    }
    return null;
  },

  async set(key: string, data: any): Promise<void> {
    localStorage.setItem(`template_${key}`, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  },

  async clear(): Promise<void> {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('template_')) {
        localStorage.removeItem(key);
      }
    });
  },
};