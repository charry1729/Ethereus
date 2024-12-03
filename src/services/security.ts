import { rateLimit } from 'express-rate-limit';
import { sanitizeHtml } from 'sanitize-html';
import { encrypt, decrypt } from './crypto';

// Rate limiting configuration
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later',
});

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return sanitizeHtml(input, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p'],
    allowedAttributes: {},
  });
};

// CSRF token management
export const generateCsrfToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Sensitive data encryption
export const encryptSensitiveData = (data: string): string => {
  return encrypt(data);
};

export const decryptSensitiveData = (encryptedData: string): string => {
  return decrypt(encryptedData);
};