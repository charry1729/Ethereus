import { useAssetStore } from '../stores/assetStore';

describe('Asset Management', () => {
  const assetStore = useAssetStore.getState();

  const mockAsset = {
    name: 'Test Property',
    type: 'real-estate',
    value: 1000000,
    status: 'active',
    description: 'Test property description',
  };

  describe('Asset Creation', () => {
    test('should create asset successfully', async () => {
      const asset = await assetStore.createAsset(mockAsset);
      expect(asset).toMatchObject({
        ...mockAsset,
        id: expect.any(String),
      });
    });
  });

  describe('Asset Listing', () => {
    test('should list all assets', () => {
      const assets = assetStore.getAssets();
      expect(Array.isArray(assets)).toBe(true);
      expect(assets.length).toBeGreaterThan(0);
    });

    test('should filter assets by type', () => {
      const assets = assetStore.getAssets();
      const realEstateAssets = assets.filter(
        asset => asset.type === 'real-estate'
      );
      expect(realEstateAssets.length).toBeGreaterThan(0);
    });

    test('should filter assets by status', () => {
      const assets = assetStore.getAssets();
      const activeAssets = assets.filter(
        asset => asset.status === 'active'
      );
      expect(activeAssets.length).toBeGreaterThan(0);
    });
  });
});