import { useState, useCallback } from 'react';
import type { CustomerAddress } from '../types/address';
import { saveAddress, getAddresses, addTrackingNumber } from '../utils/addressStorage';

export function useAddressStorage() {
  const [addresses, setAddresses] = useState<CustomerAddress[]>(getAddresses());

  const handleSaveAddress = useCallback((address: Omit<CustomerAddress, 'id' | 'createdAt'>) => {
    const newAddress = saveAddress(address);
    setAddresses(getAddresses());
    return newAddress;
  }, []);

  const handleAddTracking = useCallback((addressId: string, trackingNumber: string) => {
    addTrackingNumber(addressId, trackingNumber);
    setAddresses(getAddresses());
  }, []);

  return {
    addresses,
    saveAddress: handleSaveAddress,
    addTracking: handleAddTracking,
    refreshAddresses: () => setAddresses(getAddresses())
  };
}