import React from 'react';
import { QrCode, Trash2 } from 'lucide-react';
import type { CustomerAddress } from '../../../types/address';
import { AddressInfo } from './AddressInfo';
import { TrackingHistory } from './TrackingHistory';
import { isTrackingActive } from '../../../utils/tracking';

interface AddressCardProps {
  address: CustomerAddress;
  onScanClick: () => void;
  onDelete: () => void;
}

export function AddressCard({ address, onScanClick, onDelete }: AddressCardProps) {
  const hasActiveTracking = address.trackingNumbers?.some(isTrackingActive);

  return (
    <div
      className={`p-4 rounded-lg border transition-colors ${
        hasActiveTracking 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 hover:border-blue-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <AddressInfo address={address} />
        <div className="flex gap-2">
          {!hasActiveTracking && (
            <button
              onClick={onScanClick}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              title="Scan Tracking Number"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
            title="Delete Address"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {address.trackingNumbers && address.trackingNumbers.length > 0 && (
        <TrackingHistory 
          addressId={address.id} 
          trackingNumbers={address.trackingNumbers} 
        />
      )}
    </div>
  );
}