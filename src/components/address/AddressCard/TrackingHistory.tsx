import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import type { TrackingNumber } from '../../../types/address';
import { generateTrackingKey, sortTrackingNumbers } from '../../../utils/tracking';

interface TrackingHistoryProps {
  addressId: string;
  trackingNumbers: TrackingNumber[];
}

export function TrackingHistory({ addressId, trackingNumbers }: TrackingHistoryProps) {
  if (!trackingNumbers?.length) return null;

  const sortedTrackingNumbers = sortTrackingNumbers(trackingNumbers);

  return (
    <div className="mt-3 pt-3 border-t">
      <p className="text-sm font-medium text-gray-500 flex items-center gap-1 mb-2">
        <Clock className="w-4 h-4" />
        Tracking History
      </p>
      <div className="space-y-2">
        {sortedTrackingNumbers.map((tracking) => (
          <div
            key={generateTrackingKey(addressId, tracking)}
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
  );
}