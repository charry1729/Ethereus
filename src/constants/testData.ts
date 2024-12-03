export const TEST_CONTRACT_DATA = {
  name: 'Manhattan Property Purchase Agreement',
  type: 'real-estate',
  template: 'real-estate-purchase',
  jurisdiction: 'USA',
  parties: [
    { name: 'John Smith', role: 'Seller', address: '0x1234...5678' },
    { name: 'Alice Johnson', role: 'Buyer', address: '0x8765...4321' },
  ],
  terms: [
    { 
      title: 'Purchase Price',
      content: 'The Buyer agrees to purchase the Property for the sum of $2,500,000 USD, payable as follows...'
    },
    {
      title: 'Closing Date',
      content: 'The closing shall take place on or before March 31, 2024, at the offices of...'
    },
    {
      title: 'Property Inspection',
      content: 'The Buyer shall have the right to conduct a professional inspection of the Property within 14 days...'
    }
  ],
};