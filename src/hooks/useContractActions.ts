import { useState, useCallback } from 'react';
import { Contract } from '../stores/contractStore';
import { useBlockchain } from './useBlockchain';
import { notificationService } from '../services/notification';
import { ipfsService } from '../services/ipfs';

export function useContractActions() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { signContract } = useBlockchain();

  const handleSign = useCallback(async (contract: Contract) => {
    setIsProcessing(true);
    try {
      await signContract(contract.id, 'signer-address');
      notificationService.success('Contract signed successfully');
    } catch (error) {
      notificationService.error('Failed to sign contract');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [signContract]);

  const handleShare = useCallback((contract: Contract) => {
    const url = `${window.location.origin}/contracts/${contract.id}`;
    navigator.clipboard.writeText(url);
    notificationService.success('Contract link copied to clipboard');
  }, []);

  const handleDownload = useCallback(async (contract: Contract) => {
    setIsProcessing(true);
    try {
      const cid = await ipfsService.uploadJson(contract);
      const url = ipfsService.getUrl(cid);
      window.open(url, '_blank');
      notificationService.success('Contract downloaded successfully');
    } catch (error) {
      notificationService.error('Failed to download contract');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    handleSign,
    handleShare,
    handleDownload,
    isProcessing,
  };
}