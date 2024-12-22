import type { CustomerAddress, TrackingNumber } from '../../types/address';
import type { AddressStorage } from './types';
import { getStorageItem, setStorageItem, clearStorageItem } from './localStorage';

const STORAGE_KEY = 'saved_addresses';

class AddressStorageImpl implements AddressStorage {
  get(): CustomerAddress[] {
    return getStorageItem<CustomerAddress>(STORAGE_KEY);
  }

  save(address: Omit<CustomerAddress, 'id' | 'createdAt'>): void {
    const addresses = this.get();
    const newAddress: CustomerAddress = {
      ...address,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      trackingNumbers: []
    };
    
    addresses.push(newAddress);
    setStorageItem(STORAGE_KEY, addresses);
  }

  clear(): void {
    clearStorageItem(STORAGE_KEY);
  }

  delete(id: string): void {
    const addresses = this.get();
    const filtered = addresses.filter(addr => addr.id !== id);
    setStorageItem(STORAGE_KEY, filtered);
  }

  update(id: string, data: Partial<CustomerAddress>): void {
    const addresses = this.get();
    const index = addresses.findIndex(addr => addr.id === id);
    
    if (index !== -1) {
      addresses[index] = { ...addresses[index], ...data };
      setStorageItem(STORAGE_KEY, addresses);
    }
  }

  addTracking(addressId: string, trackingNumber: string): void {
    const addresses = this.get();
    const address = addresses.find(addr => addr.id === addressId);
    
    if (address) {
      const newTracking: TrackingNumber = {
        number: trackingNumber,
        date: new Date().toISOString(),
        status: 'pending'
      };

      address.trackingNumbers = [
        ...(address.trackingNumbers || []),
        newTracking
      ];
      
      setStorageItem(STORAGE_KEY, addresses);
    }
  }

  updateTrackingStatus(
    addressId: string, 
    trackingNumber: string, 
    status: TrackingNumber['status']
  ): void {
    const addresses = this.get();
    const address = addresses.find(addr => addr.id === addressId);
    
    if (address?.trackingNumbers) {
      const tracking = address.trackingNumbers.find(t => t.number === trackingNumber);
      if (tracking) {
        tracking.status = status;
        setStorageItem(STORAGE_KEY, addresses);
      }
    }
  }
}

export const addressStorage = new AddressStorageImpl();