import React from 'react';
import { ContractFormData } from '../../types/contract';

interface ContractPreviewProps {
  data: ContractFormData & { jurisdiction: string };
}

export const ContractPreview: React.FC<ContractPreviewProps> = ({ data }) => {
  return (
    <div className="bg-white text-black p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
        <p className="text-gray-600">Jurisdiction: {data.jurisdiction}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Parties</h2>
        {data.parties.map((party, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-medium">{party.role}</h3>
            <p>{party.name}</p>
            {party.address && (
              <p className="text-sm text-gray-600">Wallet: {party.address}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
        {data.terms.map((term, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-medium mb-2">{term.title}</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{term.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};