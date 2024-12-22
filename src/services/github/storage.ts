import type { CustomerAddress } from '../../types/address';
import { fetchFileContent, updateFile } from './api';
import { AddressCache } from './cache';

export class GitHubStorageService {
  private static instance: GitHubStorageService;
  private cache: AddressCache;

  private constructor() {
    this.cache = new AddressCache();
  }

  static getInstance(): GitHubStorageService {
    if (!GitHubStorageService.instance) {
      GitHubStorageService.instance = new GitHubStorageService();
    }
    return GitHubStorageService.instance;
  }

  async getAddresses(): Promise<CustomerAddress[]> {
    if (this.cache.isValid()) {
      return this.cache.get();
    }

    try {
      const { content } = await fetchFileContent();
      const addresses = JSON.parse(content);
      this.cache.set(addresses);
      return addresses;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }
  }

  async saveAddress(address: Omit<CustomerAddress, 'id' | 'createdAt'>): Promise<void> {
    try {
      const { content, sha } = await fetchFileContent();
      const addresses: CustomerAddress[] = JSON.parse(content);

      const newAddress: CustomerAddress = {
        ...address,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        trackingNumbers: []
      };

      addresses.push(newAddress);
      await updateFile(JSON.stringify(addresses, null, 2), sha);
      this.cache.set(addresses);
    } catch (error) {
      console.error('Error saving address:', error);
      throw error;
    }
  }
}