import React from 'react';
import { formatAddress } from '../../utils/format';

interface WalletAddressProps {
  address: string;
}

export const WalletAddress: React.FC<WalletAddressProps> = ({ address }) => (
  <div className="bg-slate-700 rounded-lg px-4 py-2">
    <div className="text-sm text-gray-400">Address</div>
    <div className="font-medium">{formatAddress(address)}</div>
  </div>
);