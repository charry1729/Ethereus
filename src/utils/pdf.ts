import { Contract } from '../stores/contractStore';
import { Asset } from '../stores/assetStore';
import { formatCurrency } from './format';

export const generateContractPDF = async (contract: Contract, asset: Asset): Promise<void> => {
  // This is a simplified example. In a real application, you'd use a library like pdfmake or jspdf
  const content = `
    ASSET PURCHASE AGREEMENT
    
    This agreement is made on ${new Date(contract.createdAt).toLocaleDateString()}
    
    BETWEEN:
    ${contract.parties.map(party => `${party.name} (${party.role})`).join(' AND ')}
    
    REGARDING THE FOLLOWING ASSET:
    Type: ${asset.type}
    Value: ${formatCurrency(asset.value)}
    
    TERMS AND CONDITIONS:
    ${contract.terms.map(term => `
    ${term.title}
    ${term.content}
    `).join('\n')}
    
    JURISDICTION:
    This agreement is governed by the laws of ${contract.jurisdiction}
    
    SIGNATURES:
    ${contract.parties.map(party => `
    ${party.name}
    Role: ${party.role}
    Wallet: ${party.address}
    `).join('\n')}
  `;

  // Simulate PDF generation and download
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create a Blob and trigger download
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${contract.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};