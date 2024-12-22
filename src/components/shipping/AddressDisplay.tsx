import React from 'react';
import type { Address } from '../../types/shipping';

interface AddressDisplayProps {
  title: string;
  address: Address;
  className?: string;
}

export function AddressDisplay({ title, address, className = '' }: AddressDisplayProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h2 className="text-lg font-semibold bg-gray-100 p-2">{title}</h2>
      <div className="p-4 border-2 border-gray-400 rounded">
        <p className="font-bold">{address.name}</p>
        <p className="mt-1">{address.address}</p>
        <p>{address.city}, {address.state}</p>
        <p>PIN: {address.pincode}</p>
        <p>Phone: {address.phone}</p>
      </div>
    </div>
  );
}