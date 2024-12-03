import React from 'react';
import { Wallet, LogOut, Loader2 } from 'lucide-react';
import { useWalletStore } from '../../services/wallet';
import { WalletBalance } from './WalletBalance';
import { WalletAddress } from './WalletAddress';

export const WalletConnect: React.FC = () => {
  const {
    address,
    balance,
    isConnecting,
    isConnected,
    connect,
    disconnect,
  } = useWalletStore();

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-4">
        <WalletBalance balance={balance} />
        <WalletAddress address={address} />
        <button
          onClick={disconnect}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          title="Disconnect Wallet"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
    >
      {isConnecting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};