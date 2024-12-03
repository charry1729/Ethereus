import { z } from 'zod';

export const contractSchema = z.object({
  name: z.string().min(2, 'Contract name is required'),
  type: z.enum(['real-estate', 'media-rights', 'fine-art']),
  template: z.string(),
  jurisdiction: z.string().min(1, 'Jurisdiction is required'),
  parties: z.array(z.object({
    name: z.string().min(1, 'Party name is required'),
    role: z.string().min(1, 'Role is required'),
    address: z.string().optional(),
  })).min(2, 'At least two parties are required'),
  terms: z.array(z.object({
    title: z.string().min(1, 'Term title is required'),
    content: z.string().min(1, 'Term content is required'),
  })).min(1, 'At least one term is required'),
});

export type ContractFormData = z.infer<typeof contractSchema>;