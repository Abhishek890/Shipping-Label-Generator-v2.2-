import type { CustomerAddress, TrackingNumber } from '../types/address';

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  return newAddress;
}

export function getAddresses(): CustomerAddress[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading addresses from storage:', error);
    return [];
  }
}

export function deleteAddress(id: string): void {
  const addresses = getAddresses();
  const filteredAddresses = addresses.filter(addr => addr.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredAddresses));
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
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    }
  }
}