import { create } from 'zustand';
import { connectWallet, disconnectWallet, updateWalletBalance } from './actions';
import type { WalletState, WalletStore } from './types';

const initialState: WalletState = {
  address: null,
  balance: null,
  chainId: null,
  isConnecting: false,
  isConnected: false,
  error: null,
};

export const useWalletStore = create<WalletStore>((set, get) => ({
  ...initialState,
  connect: () => connectWallet(set, get),
  disconnect: () => disconnectWallet(set),
  updateBalance: () => updateWalletBalance(set, get),
}));