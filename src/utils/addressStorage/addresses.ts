import type { CustomerAddress } from '../../types/address';

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

export function clearAddresses(): void {
  localStorage.removeItem(STORAGE_KEY);
}