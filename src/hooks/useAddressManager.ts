import { useState, useEffect } from 'react';
import type { CustomerAddress } from '../types/address';
import { GitHubStorageService } from '../services/githubStorage';

export function useAddressManager() {
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const storage = GitHubStorageService.getInstance();

  useEffect(() => {
    async function loadAddresses() {
      try {
        const data = await storage.getAddresses();
        setAddresses(data);
        setError(null);
      } catch (err) {
        setError('Failed to load addresses');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAddresses();
  }, []);

  const saveAddress = async (address: Omit<CustomerAddress, 'id' | 'createdAt'>) => {
    try {
      await storage.saveAddress(address);
      const updatedAddresses = await storage.getAddresses();
      setAddresses(updatedAddresses);
      setError(null);
    } catch (err) {
      setError('Failed to save address');
      throw err;
    }
  };

  return {
    addresses,
    isLoading,
    error,
    saveAddress
  };
}