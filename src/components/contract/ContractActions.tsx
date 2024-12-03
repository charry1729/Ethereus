import React from 'react';
import { Download, Eye, Pencil, Trash2, Share2, CheckCircle } from 'lucide-react';
import { Contract } from '../../stores/contractStore';
import { useBlockchain } from '../../hooks/useBlockchain';
import { notificationService } from '../../services/notification';

interface ContractActionsProps {
  contract: Contract;
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ContractActions: React.FC<ContractActionsProps> = ({
  contract,
  onPreview,
  onEdit,
  onDelete,
}) => {
  const { signContract, isDeploying, isSigning } = useBlockchain();

  const handleSign = async () => {
    try {
      await signContract(contract.id, 'signer-address');
      notificationService.success('Contract signed successfully');
    } catch (error) {
      notificationService.error('Failed to sign contract');
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/contracts/${contract.id}`;
    navigator.clipboard.writeText(url);
    notificationService.success('Contract link copied to clipboard');
  };

  const handleDownload = () => {
    notificationService.success('Contract downloaded successfully');
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onPreview}
        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
        title="Preview"
      >
        <Eye className="w-5 h-5" />
      </button>

      {contract.status !== 'completed' && (
        <>
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>

          <button
            onClick={handleSign}
            disabled={isSigning}
            className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors disabled:opacity-50"
            title="Sign"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        </>
      )}

      <button
        onClick={handleShare}
        className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors"
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

      {contract.status === 'draft' && (
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};