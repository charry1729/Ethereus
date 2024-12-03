import React from 'react';
import { CheckCircle, Clock, User } from 'lucide-react';

interface Signature {
  id: string;
  partyName: string;
  role: string;
  status: 'signed' | 'pending' | 'rejected';
  timestamp?: Date;
  signatureHash?: string;
}

interface ContractSignaturesProps {
  signatures: Signature[];
  onRequestSignature?: (partyId: string) => void;
}

export const ContractSignatures: React.FC<ContractSignaturesProps> = ({
  signatures,
  onRequestSignature,
}) => {
  const getStatusIcon = (status: Signature['status']) => {
    switch (status) {
      case 'signed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'rejected':
        return <User className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {signatures.map((signature) => (
        <div
          key={signature.id}
          className="bg-slate-800 p-4 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-slate-700 rounded-full">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">{signature.partyName}</h4>
              <p className="text-sm text-gray-400">{signature.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {signature.status === 'signed' && (
              <div className="text-right">
                <p className="text-sm text-gray-400">Signed at</p>
                <p className="text-sm text-white">
                  {signature.timestamp?.toLocaleDateString()}
                </p>
              </div>
            )}
            
            {signature.status === 'pending' && onRequestSignature && (
              <button
                onClick={() => onRequestSignature(signature.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Request Signature
              </button>
            )}
            
            <div className="flex items-center space-x-2">
              {getStatusIcon(signature.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};