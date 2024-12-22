import type { CustomerAddress } from '../types/address';
import { addressStorage } from '../utils/storage/addressStorage';

class AddressService {
  private subscribers: ((addresses: CustomerAddress[]) => void)[] = [];

  subscribe(callback: (addresses: CustomerAddress[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notify() {
    const addresses = addressStorage.get();
    this.subscribers.forEach(callback => callback(addresses));
  }

  saveNewAddress(address: Omit<CustomerAddress, 'id' | 'createdAt'>) {
    addressStorage.save(address);
    this.notify();
  }

  deleteAddress(id: string) {
    addressStorage.delete(id);
    this.notify();
  }

  clearAddresses() {
    addressStorage.clear();
    this.notify();
  }

  addTrackingNumber(addressId: string, trackingNumber: string) {
    addressStorage.addTracking(addressId, trackingNumber);
    this.notify();
  }

  updateTrackingStatus(addressId: string, trackingNumber: string, status: 'pending' | 'dispatched' | 'delivered') {
    addressStorage.updateTrackingStatus(addressId, trackingNumber, status);
    this.notify();
  }
}

export const addressService = new AddressService();