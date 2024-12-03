// Simulated IPFS service for decentralized storage
const IPFS_GATEWAY = 'https://ipfs.io/ipfs';

export const ipfsService = {
  async uploadJson(data: any): Promise<string> {
    // Simulate IPFS upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    const cid = `Qm${Math.random().toString(36).substring(2, 15)}`;
    return cid;
  },

  async uploadFile(file: File): Promise<string> {
    // Simulate file upload to IPFS
    await new Promise(resolve => setTimeout(resolve, 2000));
    const cid = `Qm${Math.random().toString(36).substring(2, 15)}`;
    return cid;
  },

  getUrl(cid: string): string {
    return `${IPFS_GATEWAY}/${cid}`;
  },

  async getData(cid: string): Promise<any> {
    // Simulate fetching data from IPFS
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      timestamp: new Date().toISOString(),
      data: {},
    };
  },
};