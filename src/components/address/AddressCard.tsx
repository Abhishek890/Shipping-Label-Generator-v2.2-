import React from 'react';
import { QrCode, ExternalLink, Clock } from 'lucide-react';
import type { CustomerAddress } from '../../types/address';

interface AddressCardProps {
  address: CustomerAddress;
  onScanClick: () => void;
}

export function AddressCard({ address, onScanClick }: AddressCardProps) {
  const isShipped = address.trackingNumbers?.some(t => t.status === 'dispatched');

  return (
    <div
      className={`p-4 rounded-lg border transition-colors ${
        isShipped 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 hover:border-blue-200'
      }`}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{address.name}</p>
            <p className="text-sm text-gray-600">{address.address}</p>
            <p className="text-sm text-gray-600">
              {address.city}, {address.state} - {address.pincode}
            </p>
          </div>
          {!isShipped && (
            <button
              onClick={onScanClick}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              title="Scan Tracking Number"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}
        </div>

        {address.trackingNumbers && address.trackingNumbers.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm font-medium text-gray-500 flex items-center gap-1 mb-2">
              <Clock className="w-4 h-4" />
              Tracking History
            </p>
            <div className="space-y-2">
              {address.trackingNumbers.map((tracking) => (
                <div
                  key={`${address.id}-${tracking.number}`} // Using a composite key to ensure uniqueness
                  className="text-sm p-2 rounded bg-white/50"
                >
                  <div className="flex items-center justify-between">
                    <span>{tracking.number}</span>
                    <a
                      href={`https://example.com/track/${tracking.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(tracking.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}