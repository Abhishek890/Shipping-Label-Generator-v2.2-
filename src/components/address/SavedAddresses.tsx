import React from 'react';
import { Package, AlertTriangle, Loader } from 'lucide-react';
import { useAddressManager } from '../../hooks/useAddressManager';
import { AddressCard } from './AddressCard';

export function SavedAddresses() {
  const { addresses, isLoading, error } = useAddressManager();

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-100 p-4">
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="w-5 h-5" />
          Saved Customer Addresses
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onScanClick={() => {}}
            onDelete={() => {}}
          />
        ))}

        {addresses.length === 0 && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No saved addresses yet
          </div>
        )}
      </div>
    </div>
  );
}