import React from 'react';
import { Download, X, FileText, Calendar, Globe2, User, ArrowRight, Shield, Link as LinkIcon } from 'lucide-react';
import { Contract } from '../../stores/contractStore';
import { Asset } from '../../stores/assetStore';
import { formatCurrency } from '../../utils/format';
import { generateContractPDF } from '../../utils/pdf';
import { notificationService } from '../../services/notification';

interface AssetContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
  contract: Contract;
}

export const AssetContractModal: React.FC<AssetContractModalProps> = ({
  isOpen,
  onClose,
  asset,
  contract,
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateContractPDF(contract, asset);
      notificationService.success('Contract PDF downloaded successfully');
    } catch (error) {
      notificationService.error('Failed to generate PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-slate-900/75" onClick={onClose} />

        <div className="relative inline-block w-full max-w-4xl overflow-hidden text-left align-middle transition-all transform rounded-lg shadow-xl">
          {/* Contract Preview */}
          <div className="bg-[url('https://images.unsplash.com/photo-1619551734325-81aaf323686c?q=80&w=1920')] bg-cover bg-center">
            <div className="backdrop-blur-sm backdrop-brightness-50 p-8">
              {/* Header with Logo and Title */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <Shield className="w-10 h-10 text-blue-400" />
                  <div>
                    <h3 className="text-3xl font-bold text-white">Digital Asset Certificate</h3>
                    <p className="text-gray-300">Blockchain-Verified Contract</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isGeneratingPDF ? 'Generating...' : 'Export PDF'}</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20">
                {/* Asset Details */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-white mb-4">Asset Information</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400">Asset Name</p>
                        <p className="text-xl font-semibold text-white">{asset.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Type</p>
                        <p className="text-white">{asset.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Value</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(asset.value)}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400">Contract Type</p>
                        <p className="text-white">{contract.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Jurisdiction</p>
                        <p className="text-white">{contract.jurisdiction}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Created Date</p>
                        <p className="text-white">{new Date(contract.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blockchain Verification */}
                <div className="bg-slate-900/50 p-4 rounded-lg mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-5 h-5 text-green-400" />
                    <h5 className="text-lg font-semibold text-white">Blockchain Verification</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Contract Hash</p>
                      <p className="text-green-400 font-mono">{asset.blockchainHash}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Last Verified</p>
                      <p className="text-white">{asset.lastVerified}</p>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Contract Terms</h4>
                  <div className="space-y-4">
                    {contract.terms.map((term, index) => (
                      <div key={index} className="bg-slate-900/30 p-4 rounded-lg">
                        <h5 className="font-medium text-white mb-2">{term.title}</h5>
                        <p className="text-gray-300">{term.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signatures */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Digital Signatures</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {contract.parties.map((party, index) => (
                      <div key={index} className="bg-slate-900/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-white font-medium">{party.name}</p>
                            <p className="text-gray-400 text-sm">{party.role}</p>
                          </div>
                          <Shield className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-sm font-mono text-gray-400">{party.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};