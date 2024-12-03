import React from 'react';
import { X, Download, Share2 } from 'lucide-react';
import { ContractPreview } from '../contract-builder/ContractPreview';
import { Contract } from '../../stores/contractStore';
import { notificationService } from '../../services/notification';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Contract | null;
}

export const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onClose, contract }) => {
  if (!isOpen || !contract) return null;

  const handleShare = () => {
    const url = `${window.location.origin}/contracts/${contract.id}`;
    navigator.clipboard.writeText(url);
    notificationService.success('Contract link copied to clipboard');
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    notificationService.success('Contract downloaded successfully');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-slate-900/75" onClick={onClose} />

        <div className="relative inline-block w-full max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform bg-slate-800 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Contract Preview</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="max-h-[80vh] overflow-y-auto pr-4">
            <ContractPreview data={contract} />
          </div>
        </div>
      </div>
    </div>
  );
};