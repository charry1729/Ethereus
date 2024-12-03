import React from 'react';
import { Plus, Grid, List, Shield, Link as LinkIcon, CheckCircle2, Clock } from 'lucide-react';
import { AssetContractModal } from '../../components/asset/AssetContractModal';
import { useContractStore } from '../../stores/contractStore';
import { notificationService } from '../../services/notification';
import { formatCurrency } from '../../utils/format';

interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  status: 'active' | 'pending' | 'inactive';
  tokenId?: string;
  blockchainHash?: string;
  lastVerified?: string;
  contractType?: string;
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Manhattan Property',
    type: 'Real Estate',
    value: 1200000,
    status: 'active',
    tokenId: 'contract-1',
    blockchainHash: '0x7d3c8f...e4b2',
    lastVerified: '2024-03-15',
    contractType: 'Purchase Agreement'
  },
  {
    id: '2',
    name: 'Movie Rights - "The Last Stand"',
    type: 'Media Rights',
    value: 450000,
    status: 'pending',
    tokenId: 'contract-2',
    blockchainHash: '0x9a2d7b...c3f1',
    lastVerified: '2024-03-14',
    contractType: 'Distribution Rights'
  },
  {
    id: '3',
    name: 'Contemporary Art Collection',
    type: 'Fine Art',
    value: 750000,
    status: 'active',
    tokenId: 'contract-3',
    blockchainHash: '0x5e8f2a...b9d4',
    lastVerified: '2024-03-13',
    contractType: 'Ownership Certificate'
  }
];

const getAssetIcon = (type: string) => {
  switch (type) {
    case 'Real Estate':
      return '🏢';
    case 'Media Rights':
      return '🎬';
    case 'Fine Art':
      return '🎨';
    default:
      return '📄';
  }
};

export const Assets: React.FC = () => {
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);
  const [isContractModalOpen, setIsContractModalOpen] = React.useState(false);
  const contracts = useContractStore((state) => state.contracts);

  const handleAssetClick = (asset: Asset) => {
    const assetContract = contracts.find(c => c.id === asset.tokenId);
    if (assetContract) {
      setSelectedAsset(asset);
      setIsContractModalOpen(true);
    } else {
      notificationService.info('No contract associated with this asset');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Digital Assets</h1>
          <p className="text-gray-400">Manage and monitor your tokenized assets</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-slate-700 rounded-lg p-1 flex">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md ${view === 'grid' ? 'bg-slate-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md ${view === 'list' ? 'bg-slate-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors">
            <Plus className="w-5 h-5" />
            <span>New Asset</span>
          </button>
        </div>
      </div>

      <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {mockAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => handleAssetClick(asset)}
            className="group bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg hover:from-slate-700 hover:to-slate-600 transition-all cursor-pointer transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 border border-slate-600"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-4xl">{getAssetIcon(asset.type)}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{asset.name}</h3>
                  <p className="text-gray-400">{asset.type}</p>
                </div>
              </div>
              <span
                className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  asset.status === 'active' ? 'bg-green-500/10 text-green-400' :
                  asset.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}
              >
                {asset.status === 'active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                {asset.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                {asset.status}
              </span>
            </div>

            {/* Value */}
            <div className="mb-6">
              <div className="text-2xl font-bold text-white mb-1">
                {formatCurrency(asset.value)}
              </div>
              <p className="text-sm text-gray-400">{asset.contractType}</p>
            </div>

            {/* Blockchain Info */}
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Blockchain Hash</span>
                </div>
                <span className="text-blue-400 font-mono">{asset.blockchainHash}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  <span>Last Verified</span>
                </div>
                <span className="text-gray-300">{asset.lastVerified}</span>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="mt-4 pt-4 border-t border-slate-600/50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                View Contract Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAsset && (
        <AssetContractModal
          isOpen={isContractModalOpen}
          onClose={() => setIsContractModalOpen(false)}
          asset={selectedAsset}
          contract={contracts.find(c => c.id === selectedAsset.tokenId)!}
        />
      )}
    </div>
  );
};