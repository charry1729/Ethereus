import { useContractStore } from '../stores/contractStore';
import { blockchainService } from '../services/blockchain';

describe('Contract Management', () => {
  const contractStore = useContractStore.getState();

  const mockContract = {
    name: 'Test Contract',
    type: 'real-estate',
    template: 'real-estate-purchase',
    jurisdiction: 'USA',
    parties: [
      { name: 'Seller', role: 'seller', address: '0x123' },
      { name: 'Buyer', role: 'buyer', address: '0x456' },
    ],
    terms: [
      { title: 'Price', content: 'The price is $1,000,000' },
    ],
  };

  describe('Contract Creation', () => {
    test('should create contract successfully', async () => {
      const contract = await contractStore.createContract(mockContract);
      expect(contract).toMatchObject({
        ...mockContract,
        status: 'draft',
      });
    });

    test('should generate AI terms based on jurisdiction', async () => {
      const terms = await contractStore.generateAITerms('real-estate', 'USA');
      expect(terms.length).toBeGreaterThan(0);
      expect(terms[0]).toHaveProperty('title');
      expect(terms[0]).toHaveProperty('content');
    });
  });

  describe('Contract Templates', () => {
    test('should fetch available templates', async () => {
      const templates = await contractStore.getContractTemplates();
      expect(templates.length).toBeGreaterThan(0);
      expect(templates[0]).toHaveProperty('id');
      expect(templates[0]).toHaveProperty('name');
      expect(templates[0]).toHaveProperty('type');
    });
  });

  describe('Blockchain Integration', () => {
    test('should deploy contract to blockchain', async () => {
      const contract = await contractStore.createContract(mockContract);
      const address = await blockchainService.deployContract(contract);
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    test('should sign contract', async () => {
      const signature = await blockchainService.signContract(
        '0x123',
        '0x456'
      );
      expect(signature).toBeTruthy();
    });
  });
});