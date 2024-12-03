import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContractStore } from '../../stores/contractStore';
import { useNavigate } from 'react-router-dom';
import { ContractPreview } from './ContractPreview';
import { ContractDetails } from './ContractDetails';
import { ContractParties } from './ContractParties';
import { ContractTerms } from './ContractTerms';
import { ContractAIAssistant } from './ContractAIAssistant';
import { JurisdictionSelector } from './JurisdictionSelector';
import { useBlockchain } from '../../hooks/useBlockchain';
import { notificationService } from '../../services/notification';
import { contractSchema, type ContractFormData } from '../../types/contract';
import { TEST_CONTRACT_DATA } from '../../constants/testData';

interface ContractFormProps {
  onCancel?: () => void;
}

export const ContractForm: React.FC<ContractFormProps> = ({ onCancel }) => {
  const { createContract } = useContractStore();
  const { deployContract, isDeploying } = useBlockchain();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = React.useState(false);
  const [jurisdiction, setJurisdiction] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      name: '',
      type: undefined,
      template: '',
      parties: [
        { name: '', role: '', address: '' },
        { name: '', role: '', address: '' },
      ],
      terms: [{ title: '', content: '' }],
    },
    mode: 'onChange',
  });

  const handleLoadTestData = () => {
    Object.entries(TEST_CONTRACT_DATA).forEach(([key, value]) => {
      form.setValue(key as any, value, { shouldValidate: true });
    });
    setJurisdiction(TEST_CONTRACT_DATA.jurisdiction);
    notificationService.success('Test data loaded successfully');
  };

  const handleAITermsGenerated = (terms: any[]) => {
    const currentTerms = form.getValues('terms');
    form.setValue('terms', [...currentTerms, ...terms], { shouldValidate: true });
    notificationService.success('AI terms generated successfully');
  };

  const previewData = React.useMemo(() => ({
    ...form.watch(),
    jurisdiction,
  }), [form.watch(), jurisdiction]);

  const onSubmit = async (data: ContractFormData) => {
    try {
      setIsSubmitting(true);
      const contract = await createContract({ ...data, jurisdiction });
      
      if (contract.type === 'real-estate') {
        await deployContract(contract);
      }

      notificationService.success('Contract created successfully');
      navigate('/contracts');
    } catch (error) {
      notificationService.error('Failed to create contract');
      console.error('Failed to create contract:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isSubmitting || isDeploying;

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Create New Contract</h2>
          <p className="text-gray-400 mt-1">Build your smart contract with AI assistance</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLoadTestData}
            disabled={isFormDisabled}
            className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
          >
            Load Test Data
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-slate-800 p-4 lg:p-6 rounded-lg">
              <ContractDetails form={form} disabled={isFormDisabled} />
            </div>

            <div className="bg-slate-800 p-4 lg:p-6 rounded-lg">
              <JurisdictionSelector
                value={jurisdiction}
                onChange={setJurisdiction}
                disabled={isFormDisabled}
              />
            </div>

            <ContractAIAssistant
              type={form.watch('type')}
              jurisdiction={jurisdiction}
              onTermsGenerated={handleAITermsGenerated}
              disabled={isFormDisabled}
            />

            <div className="bg-slate-800 p-4 lg:p-6 rounded-lg">
              <ContractParties form={form} disabled={isFormDisabled} />
            </div>

            <div className="bg-slate-800 p-4 lg:p-6 rounded-lg">
              <ContractTerms form={form} disabled={isFormDisabled} />
            </div>

            <div className="flex flex-col lg:flex-row justify-end gap-4">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isFormDisabled}
                  className="w-full lg:w-auto px-6 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isFormDisabled || !form.formState.isValid}
                className="w-full lg:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Contract'}
              </button>
            </div>
          </form>
        </div>

        {showPreview && (
          <div className="xl:sticky xl:top-8 space-y-6">
            <div className="bg-slate-800 p-4 lg:p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Contract Preview</h3>
              <ContractPreview data={previewData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};