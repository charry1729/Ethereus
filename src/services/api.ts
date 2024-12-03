import { Contract } from '../stores/contractStore';
import { Asset } from '../stores/assetStore';

// Simulated API endpoints and responses
const API_DELAY = 800;

// Simulate API response delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API response with optional error
const simulateResponse = async <T>(data: T, shouldError = false): Promise<T> => {
  await delay(API_DELAY);
  if (shouldError) {
    throw new Error('API Error');
  }
  return data;
};

// Contract Service
export const contractService = {
  async getContracts(): Promise<Contract[]> {
    return simulateResponse([]);
  },

  async getContract(id: string): Promise<Contract> {
    return simulateResponse({} as Contract);
  },

  async createContract(contract: Omit<Contract, 'id'>): Promise<Contract> {
    return simulateResponse({
      id: `contract-${Date.now()}`,
      ...contract,
    } as Contract);
  },

  async updateContract(id: string, contract: Partial<Contract>): Promise<Contract> {
    return simulateResponse({
      id,
      ...contract,
    } as Contract);
  },

  async deleteContract(id: string): Promise<void> {
    return simulateResponse(undefined);
  },
};

// Asset Service
export const assetService = {
  async getAssets(): Promise<Asset[]> {
    return simulateResponse([]);
  },

  async getAsset(id: string): Promise<Asset> {
    return simulateResponse({} as Asset);
  },

  async createAsset(asset: Omit<Asset, 'id'>): Promise<Asset> {
    return simulateResponse({
      id: `asset-${Date.now()}`,
      ...asset,
    } as Asset);
  },

  async updateAsset(id: string, asset: Partial<Asset>): Promise<Asset> {
    return simulateResponse({
      id,
      ...asset,
    } as Asset);
  },

  async deleteAsset(id: string): Promise<void> {
    return simulateResponse(undefined);
  },
};