import React from 'react';
import type { Address } from '../../types/shipping';

interface ReturnAddressProps {
  address: Address;
}

export function ReturnAddress({ address }: ReturnAddressProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-gray-500 mb-3">
        Return if not delivered to:
      </h3>
      <div className="p-3 border border-gray-300 rounded bg-white text-sm">
        <p className="font-medium">{address.name}</p>
        <p>{address.address}</p>
        <p>{address.city}, {address.state} - {address.pincode}</p>
        <p>Phone: {address.phone}</p>
      </div>
    </div>
  );
}