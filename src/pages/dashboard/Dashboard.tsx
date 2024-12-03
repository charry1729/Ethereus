import React from 'react';
import { BarChart3, Package, FileText, TrendingUp, Clock, AlertTriangle, ArrowRight, Activity, DollarSign, Users } from 'lucide-react';
import { useAssetStore } from '../../stores/assetStore';
import { useContractStore } from '../../stores/contractStore';
import { formatCurrency } from '../../utils/format';
import { ContractStats } from '../../components/contract/ContractStats';
import { Card } from '../../components/shared/Card';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const assets = useAssetStore((state) => state.assets);
  const contracts = useContractStore((state) => state.contracts);

  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const activeAssets = assets.filter(asset => asset.status === 'active').length;
  const activeContracts = contracts.filter(contract => contract.status === 'active').length;
  const pendingContracts = contracts.filter(contract => contract.status === 'pending').length;

  const recentActivity = [
    { id: 1, type: 'asset', action: 'New asset registered', time: '2 hours ago', value: '$1.2M' },
    { id: 2, type: 'contract', action: 'Contract signed', time: '4 hours ago', parties: ['John Doe', 'Alice Smith'] },
    { id: 3, type: 'asset', action: 'Asset value updated', time: '1 day ago', value: '$450K' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Contract renewal', due: '3 days', priority: 'high' },
    { id: 2, task: 'Asset valuation', due: '5 days', priority: 'medium' },
    { id: 3, task: 'Compliance review', due: '1 week', priority: 'low' },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          icon={DollarSign}
          iconColor="text-green-400"
          title="Total Value Locked"
          subtitle={formatCurrency(totalAssetValue)}
          onClick={() => navigate('/assets')}
        >
          <div className="mt-2 flex items-center text-sm text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5% from last month</span>
          </div>
        </Card>

        <Card
          icon={Activity}
          iconColor="text-blue-400"
          title="Active Contracts"
          subtitle={activeContracts.toString()}
          onClick={() => navigate('/contracts')}
        >
          <div className="mt-2 text-sm text-gray-400">
            Across {Math.ceil(activeContracts / 2)} jurisdictions
          </div>
        </Card>

        <Card
          icon={Package}
          iconColor="text-purple-400"
          title="Active Assets"
          subtitle={activeAssets.toString()}
          onClick={() => navigate('/assets')}
        >
          <div className="mt-2 text-sm text-gray-400">
            Total value: {formatCurrency(totalAssetValue)}
          </div>
        </Card>

        <Card
          icon={Users}
          iconColor="text-yellow-400"
          title="Pending Approvals"
          subtitle={pendingContracts.toString()}
          onClick={() => navigate('/contracts')}
        >
          <div className="mt-2 text-sm text-yellow-400 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>Requires attention</span>
          </div>
        </Card>
      </div>

      {/* Recent Activity & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activity">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-600 rounded-lg">
                    {activity.type === 'asset' ? (
                      <Package className="w-4 h-4 text-purple-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.time}</p>
                  </div>
                </div>
                {activity.value && (
                  <span className="text-green-400">{activity.value}</span>
                )}
                {activity.parties && (
                  <div className="flex -space-x-2">
                    {activity.parties.map((party, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center border-2 border-slate-700"
                        title={party}
                      >
                        {party[0]}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming Tasks">
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-green-500/10 text-green-400'
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">{task.task}</p>
                    <p className="text-sm text-gray-400">Due in {task.due}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};