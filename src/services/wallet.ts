import { ethers } from 'ethers';
import { create } from 'zustand';
import { notificationService } from './notification';

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}

interface WalletStore extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  updateBalance: () => Promise<void>;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  address: null,
  balance: null,
  chainId: null,
  isConnecting: false,
  isConnected: false,
  error: null,

  connect: async () => {
    try {
      set({ isConnecting: true, error: null });

      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No Web3 provider detected');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      set({
        address,
        balance: ethers.utils.formatEther(balance),
        chainId: network.chainId,
        isConnected: true,
      });

      // Setup event listeners
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          get().disconnect();
        } else {
          set({ address: accounts[0] });
          get().updateBalance();
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        set({ chainId: parseInt(chainId, 16) });
        get().updateBalance();
      });

      notificationService.success('Wallet connected successfully');
    } catch (error) {
      set({ error: (error as Error).message });
      notificationService.error('Failed to connect wallet');
    } finally {
      set({ isConnecting: false });
    }
  },

  disconnect: () => {
    set({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      error: null,
    });
    notificationService.info('Wallet disconnected');
  },

  updateBalance: async () => {
    const { address } = get();
    if (!address || typeof window === 'undefined' || !window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      set({ balance: ethers.utils.formatEther(balance) });
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  },
}));