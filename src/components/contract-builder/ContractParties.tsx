import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { ContractFormData } from '../../types/contract';

interface ContractPartiesProps {
  form: UseFormReturn<ContractFormData>;
  disabled?: boolean;
}

export const ContractParties: React.FC<ContractPartiesProps> = ({ form, disabled }) => {
  const { register, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'parties',
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Parties</h3>
        <button
          type="button"
          onClick={() => append({ name: '', role: '', address: '' })}
          disabled={disabled}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Add Party</span>
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-slate-700 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-white">Party {index + 1}</h4>
              {index >= 2 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={disabled}
                  className="text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  {...register(`parties.${index}.name`)}
                  placeholder="Party Name"
                  disabled={disabled}
                  className="block w-full rounded-md bg-slate-600 border-slate-500 text-white"
                />
                {errors.parties?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.parties[index]?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register(`parties.${index}.role`)}
                  placeholder="Role"
                  disabled={disabled}
                  className="block w-full rounded-md bg-slate-600 border-slate-500 text-white"
                />
                {errors.parties?.[index]?.role && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.parties[index]?.role?.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <input
                  {...register(`parties.${index}.address`)}
                  placeholder="Wallet Address (optional)"
                  disabled={disabled}
                  className="block w-full rounded-md bg-slate-600 border-slate-500 text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};