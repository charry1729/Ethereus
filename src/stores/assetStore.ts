import { create } from 'zustand';

export interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  status: 'active' | 'pending' | 'inactive';
  tokenId?: string;
}

interface AssetState {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  removeAsset: (id: string) => void;
}

export const useAssetStore = create<AssetState>((set) => ({
  assets: [],
  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, { ...asset, id: `asset-${Date.now()}` }],
  })),
  updateAsset: (id, updates) => set((state) => ({
    assets: state.assets.map((asset) =>
      asset.id === id ? { ...asset, ...updates } : asset
    ),
  })),
  removeAsset: (id) => set((state) => ({
    assets: state.assets.filter((asset) => asset.id !== id),
  })),
}));