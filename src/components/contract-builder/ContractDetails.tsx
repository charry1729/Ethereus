import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ContractFormData } from '../../types/contract';

interface ContractDetailsProps {
  form: UseFormReturn<ContractFormData>;
  disabled?: boolean;
}

export const ContractDetails: React.FC<ContractDetailsProps> = ({ form, disabled }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Contract Name</label>
        <input
          {...register('name')}
          disabled={disabled}
          className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white"
          placeholder="Enter contract name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Contract Type</label>
        <select
          {...register('type')}
          disabled={disabled}
          className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white"
        >
          <option value="">Select type...</option>
          <option value="real-estate">Real Estate</option>
          <option value="media-rights">Media Rights</option>
          <option value="fine-art">Fine Art</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-400">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Template</label>
        <select
          {...register('template')}
          disabled={disabled}
          className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white"
        >
          <option value="">Select template...</option>
          <option value="real-estate-purchase">Real Estate Purchase Agreement</option>
          <option value="real-estate-lease">Real Estate Lease Agreement</option>
          <option value="media-distribution">Media Distribution Rights</option>
          <option value="media-licensing">Media Licensing Agreement</option>
          <option value="art-purchase">Fine Art Purchase Agreement</option>
          <option value="art-consignment">Fine Art Consignment Agreement</option>
        </select>
        {errors.template && (
          <p className="mt-1 text-sm text-red-400">{errors.template.message}</p>
        )}
      </div>
    </div>
  );
};