import type { CustomerAddress, TrackingNumber } from '../../types/address';
import { getItem, setItem, removeItem } from './localStorage';

const STORAGE_KEY = 'saved_addresses';

export function saveAddress(address: Omit<CustomerAddress, 'id' | 'createdAt'>): CustomerAddress {
  const addresses = getAddresses();
  
  const newAddress: CustomerAddress = {
    ...address,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    trackingNumbers: []
  };
  
  addresses.push(newAddress);
  setItem(STORAGE_KEY, addresses);
  return newAddress;
}

export function getAddresses(): CustomerAddress[] {
  return getItem<CustomerAddress[]>(STORAGE_KEY) || [];
}

export function clearAddresses(): void {
  removeItem(STORAGE_KEY);
}

export function deleteAddress(id: string): void {
  const addresses = getAddresses();
  const filteredAddresses = addresses.filter(addr => addr.id !== id);
  setItem(STORAGE_KEY, filteredAddresses);
}

export function addTrackingNumber(addressId: string, trackingNumber: string): void {
  const addresses = getAddresses();
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
    
    setItem(STORAGE_KEY, addresses);
  }
}

export function updateTrackingStatus(
  addressId: string, 
  trackingNumber: string, 
  status: TrackingNumber['status']
): void {
  const addresses = getAddresses();
  const address = addresses.find(addr => addr.id === addressId);
  
  if (address?.trackingNumbers) {
    const tracking = address.trackingNumbers.find(t => t.number === trackingNumber);
    if (tracking) {
      tracking.status = status;
      setItem(STORAGE_KEY, addresses);
    }
  }
}