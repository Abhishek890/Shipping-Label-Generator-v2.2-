import type { CustomerAddress } from '../../types/address';

export class AddressCache {
  private cache: CustomerAddress[] = [];
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  isValid(): boolean {
    return this.cache.length > 0 && 
           Date.now() - this.lastFetch < this.CACHE_DURATION;
  }

  get(): CustomerAddress[] {
    return this.cache;
  }

  set(addresses: CustomerAddress[]): void {
    this.cache = addresses;
    this.lastFetch = Date.now();
  }

  clear(): void {
    this.cache = [];
    this.lastFetch = 0;
  }
}