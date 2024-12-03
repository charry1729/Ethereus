import { z } from 'zod';

// Asset validation schema
export const assetSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['real-estate', 'media-rights', 'fine-art']),
  value: z.number().min(0, 'Value must be positive'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['active', 'pending', 'inactive']),
});

// Contract validation schema
export const contractSchema = z.object({
  name: z.string().min(2, 'Contract name is required'),
  type: z.enum(['real-estate', 'media-rights', 'fine-art']),
  template: z.string(),
  parties: z.array(
    z.object({
      name: z.string().min(1, 'Party name is required'),
      role: z.string().min(1, 'Role is required'),
      address: z.string().optional(),
    })
  ).min(2, 'At least two parties are required'),
  terms: z.array(
    z.object({
      title: z.string().min(1, 'Term title is required'),
      content: z.string().min(1, 'Term content is required'),
    })
  ).min(1, 'At least one term is required'),
  jurisdiction: z.string().min(1, 'Jurisdiction is required'),
  governingLaw: z.string().min(1, 'Governing law is required'),
});

// Validation service
export const validationService = {
  validateAsset(data: any) {
    return assetSchema.safeParse(data);
  },

  validateContract(data: any) {
    return contractSchema.safeParse(data);
  },
};