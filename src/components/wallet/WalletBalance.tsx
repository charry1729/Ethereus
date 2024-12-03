import React from 'react';
import { formatBalance } from '../../utils/format';

interface WalletBalanceProps {
  balance: string | null;
}

export const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => (
  <div className="bg-slate-700 rounded-lg px-4 py-2">
    <div className="text-sm text-gray-400">Balance</div>
    <div className="font-medium">{balance ? `${formatBalance(balance)} ETH` : '---'}</div>
  </div>
);