import React from 'react';
import { Plus, Search, Filter, FileText, Clock, CheckCircle, Sparkles, Grid, List, ArrowRight } from 'lucide-react';
import { useContractStore, Contract } from '../../stores/contractStore';
import { ContractForm } from '../../components/contract-builder/ContractForm';
import { ContractTemplates } from '../../components/contract-builder/ContractTemplates';
import { ContractModal } from '../../components/contract/ContractModal';
import { ContractSuccessModal } from '../../components/contract/ContractSuccessModal';
import { notificationService } from '../../services/notification';

export const Contracts: React.FC = () => {
  const [view, setView] = React.useState<'list' | 'templates' | 'create'>('list');
  const [selectedContract, setSelectedContract] = React.useState<Contract | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [newContract, setNewContract] = React.useState<Contract | null>(null);
  const [listView, setListView] = React.useState<'grid' | 'list'>('grid');
  const contracts = useContractStore((state) => state.contracts);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState<Contract['type'] | 'all'>('all');
  const [filterStatus, setFilterStatus] = React.useState<Contract['status'] | 'all'>('all');

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || contract.type === filterType;
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleContractCreated = (contract: Contract) => {
    setNewContract(contract);
    setIsSuccessModalOpen(true);
  };

  const handleDownloadContract = () => {
    notificationService.success('Contract downloaded successfully');
  };

  const getStatusColor = (status: Contract['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'draft':
        return 'text-gray-400 bg-gray-400/10';
      default:
        return 'text-blue-400 bg-blue-400/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Contracts</h1>
          <p className="text-gray-400">Create and manage your digital contracts</p>
        </div>
        <div className="flex items-center space-x-4">
          {view === 'list' && (
            <div className="bg-slate-700 rounded-lg p-1 flex">
              <button
                onClick={() => setListView('grid')}
                className={`p-2 rounded-md ${listView === 'grid' ? 'bg-slate-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setListView('list')}
                className={`p-2 rounded-md ${listView === 'list' ? 'bg-slate-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          )}
          <button
            onClick={() => setView('templates')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Contract</span>
          </button>
        </div>
      </div>

      {view === 'list' && (
        <>
          {/* Search and Filters */}
          <div className="bg-slate-800 p-4 rounded-lg space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as Contract['type'] | 'all')}
                  className="bg-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="media-rights">Media Rights</option>
                  <option value="fine-art">Fine Art</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as Contract['status'] | 'all')}
                  className="bg-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contract List */}
          <div className={`grid ${listView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {filteredContracts.map((contract) => (
              <div
                key={contract.id}
                onClick={() => {
                  setSelectedContract(contract);
                  setIsPreviewOpen(true);
                }}
                className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-700 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{contract.name}</h3>
                      <p className="text-sm text-gray-400">{contract.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Parties</p>
                    <div className="flex -space-x-2 mt-1">
                      {contract.parties.map((party, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center border-2 border-slate-800"
                          title={`${party.name} (${party.role})`}
                        >
                          {party.name[0]}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Last Updated</p>
                    <p className="text-white">{new Date(contract.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-sm text-gray-400">{contract.jurisdiction}</span>
                  <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Create New Card */}
            <div
              onClick={() => setView('templates')}
              className="bg-slate-800 p-6 rounded-lg border-2 border-dashed border-slate-600 hover:border-blue-400 transition-colors cursor-pointer flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Plus className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Create New Contract</p>
                <p className="text-gray-400 mt-1">Start from scratch or use a template</p>
              </div>
            </div>
          </div>
        </>
      )}

      {view === 'templates' && (
        <ContractTemplates
          onSelect={(template) => {
            // Handle template selection
            setView('create');
          }}
          onCreateNew={() => setView('create')}
        />
      )}

      {view === 'create' && (
        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Create New Contract</h2>
              <p className="text-gray-400 mt-1">Build your smart contract with AI assistance</p>
            </div>
            <button
              onClick={() => setView('list')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
          <ContractForm 
            onCancel={() => setView('list')}
            onSuccess={handleContractCreated}
          />
        </div>
      )}

      {/* Modals */}
      <ContractModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        contract={selectedContract}
      />

      {newContract && (
        <ContractSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            setView('list');
          }}
          contract={newContract}
          onDownload={handleDownloadContract}
        />
      )}
    </div>
  );
};