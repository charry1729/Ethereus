import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContractStore } from '../stores/contractStore';
import { useBlockchain } from './useBlockchain';
import { notificationService } from '../services/notification';

const contractSchema = z.object({
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

export function useContractForm() {
  const { createContract } = useContractStore();
  const { deployContract, isDeploying } = useBlockchain();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      parties: [
        { name: '', role: '', address: '' },
        { name: '', role: '', address: '' },
      ],
      terms: [{ title: '', content: '' }],
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ContractFormData) => {
    try {
      setIsSubmitting(true);
      const contract = await createContract(data);
      
      if (contract.type === 'real-estate') {
        await deployContract(contract);
      }

      notificationService.success('Contract created successfully');
      return contract;
    } catch (error) {
      notificationService.error('Failed to create contract');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    isDeploying,
    isFormDisabled: isSubmitting || isDeploying,
  };
}