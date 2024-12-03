import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

interface ContractStatsProps {
  totalValue: number;
  activeContracts: number;
  pendingApprovals: number;
  expiringContracts: number;
}

export const ContractStats: React.FC<ContractStatsProps> = ({
  totalValue,
  activeContracts,
  pendingApprovals,
  expiringContracts,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-slate-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-sm text-gray-400">Total Value Locked</span>
        </div>
        <div className="text-2xl font-bold text-white">
          ${(totalValue / 1000000).toFixed(2)}M
        </div>
        <div className="mt-2 text-sm text-green-400 flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          +12.5% from last month
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-sm text-gray-400">Active Contracts</span>
        </div>
        <div className="text-2xl font-bold text-white">{activeContracts}</div>
        <div className="mt-2 text-sm text-gray-400">
          Across {Math.ceil(activeContracts / 2)} jurisdictions
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
          <span className="text-sm text-gray-400">Pending Approvals</span>
        </div>
        <div className="text-2xl font-bold text-white">{pendingApprovals}</div>
        <div className="mt-2 text-sm text-yellow-400 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {pendingApprovals} requiring attention
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <span className="text-sm text-gray-400">Expiring Soon</span>
        </div>
        <div className="text-2xl font-bold text-white">{expiringContracts}</div>
        <div className="mt-2 text-sm text-red-400 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Within next 30 days
        </div>
      </div>
    </div>
  );
};