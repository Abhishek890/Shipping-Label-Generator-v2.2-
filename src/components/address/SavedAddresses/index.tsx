import React from 'react';
import { Package } from 'lucide-react';
import { useAddressManager } from '../../../hooks/useAddressManager';
import { addressService } from '../../../services/addressService';
import { BarcodeScanner } from '../../shipping/BarcodeScanner';
import { AddressCard } from '../AddressCard';
import { ClearAllButton } from './ClearAllButton';
import { DeleteConfirmDialog } from '../../DeleteConfirmDialog';

export function SavedAddresses() {
  const { addresses, refreshAddresses } = useAddressManager();
  const [scanning, setScanning] = React.useState(false);
  const [selectedAddressId, setSelectedAddressId] = React.useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [pendingDeleteId, setPendingDeleteId] = React.useState<string | null>(null);
  const [showClearAllDialog, setShowClearAllDialog] = React.useState(false);

  const handleDeleteClick = (id: string) => {
    setPendingDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (pendingDeleteId) {
      addressService.deleteAddress(pendingDeleteId);
      refreshAddresses();
      setShowDeleteDialog(false);
      setPendingDeleteId(null);
    }
  };

  const handleClearAllClick = () => {
    setShowClearAllDialog(true);
  };

  const handleClearAllConfirm = () => {
    addressService.clearAddresses();
    refreshAddresses();
    setShowClearAllDialog(false);
  };

  const handleScanComplete = (trackingNumber: string) => {
    if (selectedAddressId) {
      addressService.addTrackingNumber(selectedAddressId, trackingNumber);
      addressService.updateTrackingStatus(selectedAddressId, trackingNumber, 'dispatched');
      refreshAddresses();
      setScanning(false);
      setSelectedAddressId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="w-5 h-5" />
          Saved Customer Addresses
        </h2>
        {addresses.length > 0 && <ClearAllButton onClear={handleClearAllClick} />}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onScanClick={() => {
              setSelectedAddressId(address.id);
              setScanning(true);
            }}
            onDelete={() => handleDeleteClick(address.id)}
          />
        ))}

        {addresses.length === 0 && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No saved addresses yet
          </div>
        )}
      </div>

      {/* Delete Single Address Dialog */}
      {showDeleteDialog && (
        <DeleteConfirmDialog
          title="Delete Address"
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setShowDeleteDialog(false);
            setPendingDeleteId(null);
          }}
        />
      )}

      {/* Clear All Addresses Dialog */}
      {showClearAllDialog && (
        <DeleteConfirmDialog
          title="Clear All Addresses"
          onConfirm={handleClearAllConfirm}
          onCancel={() => setShowClearAllDialog(false)}
        />
      )}

      {/* Barcode Scanner Modal */}
      {scanning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <BarcodeScanner
              onScan={handleScanComplete}
              onClose={() => {
                setScanning(false);
                setSelectedAddressId(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}