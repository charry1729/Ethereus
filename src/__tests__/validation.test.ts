import { validationService } from '../services/validation';

describe('Data Validation', () => {
  describe('Asset Validation', () => {
    test('should validate valid asset data', () => {
      const result = validationService.validateAsset({
        name: 'Test Asset',
        type: 'real-estate',
        value: 1000000,
        description: 'Valid description text',
        status: 'active',
      });
      expect(result.success).toBe(true);
    });

    test('should reject invalid asset data', () => {
      const result = validationService.validateAsset({
        name: 'T', // Too short
        type: 'invalid-type',
        value: -1000, // Negative value
        description: 'Short', // Too short
        status: 'invalid-status',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Contract Validation', () => {
    test('should validate valid contract data', () => {
      const result = validationService.validateContract({
        name: 'Test Contract',
        type: 'real-estate',
        template: 'purchase-agreement',
        jurisdiction: 'USA',
        governingLaw: 'New York State Law',
        parties: [
          { name: 'Party 1', role: 'seller' },
          { name: 'Party 2', role: 'buyer' },
        ],
        terms: [
          { title: 'Term 1', content: 'Content 1' },
        ],
      });
      expect(result.success).toBe(true);
    });

    test('should reject invalid contract data', () => {
      const result = validationService.validateContract({
        name: 'T',
        type: 'invalid-type',
        template: '',
        jurisdiction: '',
        governingLaw: '',
        parties: [], // Empty parties
        terms: [], // Empty terms
      });
      expect(result.success).toBe(false);
    });
  });
});