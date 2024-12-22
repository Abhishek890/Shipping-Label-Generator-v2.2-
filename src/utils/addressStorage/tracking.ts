import type { TrackingNumber } from '../../types/address';
import { getAddresses } from './addresses';

const STORAGE_KEY = 'saved_addresses';

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
    address.lastUsed = new Date().toISOString();
    
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
    if (tracking && tracking.status !== status) {
      tracking.status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    }
  }
}