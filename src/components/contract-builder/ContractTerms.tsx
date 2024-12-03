import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { ContractFormData } from '../../types/contract';

interface ContractTermsProps {
  form: UseFormReturn<ContractFormData>;
  disabled?: boolean;
}

export const ContractTerms: React.FC<ContractTermsProps> = ({ form, disabled }) => {
  const { register, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'terms',
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Terms</h3>
        <button
          type="button"
          onClick={() => append({ title: '', content: '' })}
          disabled={disabled}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Add Term</span>
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-slate-700 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-white">Term {index + 1}</h4>
              {index >= 1 && (
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

            <div className="space-y-4">
              <div>
                <input
                  {...register(`terms.${index}.title`)}
                  placeholder="Term Title"
                  disabled={disabled}
                  className="block w-full rounded-md bg-slate-600 border-slate-500 text-white"
                />
                {errors.terms?.[index]?.title && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.terms[index]?.title?.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  {...register(`terms.${index}.content`)}
                  placeholder="Term Content"
                  rows={4}
                  disabled={disabled}
                  className="block w-full rounded-md bg-slate-600 border-slate-500 text-white"
                />
                {errors.terms?.[index]?.content && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.terms[index]?.content?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};