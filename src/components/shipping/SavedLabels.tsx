import React from 'react';
import { Package, Trash2, QrCode, ExternalLink } from 'lucide-react';
import type { ShippingData } from '../../types/shipping';
import { getShippingLabels, clearShippingLabels, updateShippingLabel } from '../../utils/storage';
import { BarcodeScanner } from './BarcodeScanner';

export function SavedLabels() {
  const [labels, setLabels] = React.useState<ShippingData[]>([]);
  const [scanning, setScanning] = React.useState(false);
  const [selectedLabelId, setSelectedLabelId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLabels(getShippingLabels());
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved labels?')) {
      clearShippingLabels();
      setLabels([]);
    }
  };

  const handleScanComplete = (trackingNumber: string) => {
    if (selectedLabelId) {
      updateShippingLabel(selectedLabelId, {
        trackingNumber,
        status: 'dispatched'
      });
      setLabels(getShippingLabels());
      setScanning(false);
      setSelectedLabelId(null);
    }
  };

  const handleTrackingUpdate = (id: string, trackingNumber: string) => {
    updateShippingLabel(id, { trackingNumber });
    setLabels(getShippingLabels());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="w-5 h-5" />
          Saved Labels
        </h2>
        <button
          onClick={handleClearAll}
          className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {labels.map((label) => (
          <div
            key={label.id}
            className={`p-4 rounded-lg border ${
              label.status === 'dispatched' ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{label.to.name}</p>
                <p className="text-sm text-gray-600">{label.to.address}</p>
                <p className="text-sm text-gray-600">
                  {label.to.city}, {label.to.state} - {label.to.pincode}
                </p>
                <p className="text-sm text-gray-600">Created: {new Date(label.createdAt!).toLocaleDateString()}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {label.trackingNumber ? (
                  <a
                    href={`https://example.com/track/${label.trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Track
                  </a>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter tracking #"
                      className="px-2 py-1 text-sm border rounded"
                      onChange={(e) => handleTrackingUpdate(label.id!, e.target.value)}
                    />
                    <button
                      onClick={() => {
                        setSelectedLabelId(label.id!);
                        setScanning(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="Scan Barcode"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {labels.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No saved labels yet
          </div>
        )}
      </div>

      {scanning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <BarcodeScanner
              onScan={handleScanComplete}
              onClose={() => {
                setScanning(false);
                setSelectedLabelId(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}