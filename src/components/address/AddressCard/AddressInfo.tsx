import React from 'react';
import type { CustomerAddress } from '../../../types/address';

interface AddressInfoProps {
  address: CustomerAddress;
}

export function AddressInfo({ address }: AddressInfoProps) {
  return (
    <div>
      <p className="font-semibold">{address.name}</p>
      <p className="text-sm text-gray-600">{address.address}</p>
      <p className="text-sm text-gray-600">
        {address.city}, {address.state} - {address.pincode}
      </p>
    </div>
  );
}