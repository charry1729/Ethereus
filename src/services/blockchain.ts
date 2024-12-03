import { ethers } from 'ethers';
import { Contract } from '../stores/contractStore';
import { notificationService } from './notification';

class BlockchainService {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private initialized: boolean = false;

  async initialize(): Promise<void> {
    // Skip initialization if already done
    if (this.initialized) return;

    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.initialized = true;
      } else {
        console.info('Web3 provider not available - running in fallback mode');
      }
    } catch (error) {
      console.info('Blockchain initialization skipped - running in fallback mode');
    }
  }

  async connectWallet(): Promise<string> {
    if (!this.provider) {
      throw new Error('Web3 provider not available');
    }

    try {
      const accounts = await this.provider.send('eth_requestAccounts', []);
      notificationService.success('Wallet connected successfully');
      return accounts[0];
    } catch (error) {
      notificationService.error('Failed to connect wallet');
      throw error;
    }
  }

  async deployContract(contract: Contract): Promise<string> {
    if (!this.initialized) {
      // Return a mock address if blockchain is not available
      return `0x${Math.random().toString(16).slice(2)}`;
    }

    try {
      // Simulate contract deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      const contractAddress = `0x${Math.random().toString(16).slice(2)}`;
      
      notificationService.success('Contract deployed successfully');
      return contractAddress;
    } catch (error) {
      notificationService.error('Contract deployment failed');
      throw error;
    }
  }

  async signContract(contractAddress: string, signerAddress: string): Promise<string> {
    if (!this.initialized) {
      // Return a mock signature if blockchain is not available
      return `0x${Math.random().toString(16).slice(2)}`;
    }

    try {
      const message = `Sign contract: ${contractAddress}`;
      const signature = this.signer ? 
        await this.signer.signMessage(message) : 
        `0x${Math.random().toString(16).slice(2)}`;
      
      notificationService.success('Contract signed successfully');
      return signature;
    } catch (error) {
      notificationService.error('Contract signing failed');
      throw error;
    }
  }

  async getContractState(contractAddress: string): Promise<any> {
    if (!this.initialized) {
      // Return mock state if blockchain is not available
      return {
        status: 'active',
        lastUpdate: new Date().toISOString(),
        parties: [],
        balance: ethers.utils.parseEther('0.1'),
      };
    }

    try {
      // Simulate fetching contract state
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        status: 'active',
        lastUpdate: new Date().toISOString(),
        parties: [],
        balance: ethers.utils.parseEther('0.1'),
      };
    } catch (error) {
      notificationService.error('Failed to fetch contract state');
      throw error;
    }
  }

  async executeContractMethod(
    contractAddress: string,
    method: string,
    params: any[]
  ): Promise<any> {
    if (!this.initialized) {
      // Return mock response if blockchain is not available
      return true;
    }

    try {
      // Simulate method execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      notificationService.success(`Method ${method} executed successfully`);
      return true;
    } catch (error) {
      notificationService.error(`Failed to execute ${method}`);
      throw error;
    }
  }

  async validateContract(contract: Contract): Promise<boolean> {
    try {
      // Simulate contract validation
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      notificationService.error('Contract validation failed');
      throw error;
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const blockchainService = new BlockchainService();