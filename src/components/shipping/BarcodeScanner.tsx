import React, { useRef } from 'react';
import { X, Camera, Loader } from 'lucide-react';
import { useScanner } from './scanner/useScanner';

interface BarcodeScannerProps {
  onScan: (trackingNumber: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const { error, isScanning } = useScanner({
    onScan,
    targetRef: videoRef
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Scan Barcode
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-900">
            <p className="text-center px-4">{error}</p>
          </div>
        ) : (
          <>
            <div ref={videoRef} className="w-full h-full" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-[10%] border-2 border-blue-500 opacity-50">
                <div className="absolute top-1/2 left-0 right-0 border-t-2 border-blue-500" />
                <div className="absolute left-1/2 top-0 bottom-0 border-l-2 border-blue-500" />
              </div>
            </div>
            {isScanning && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/75 text-white px-3 py-1 rounded-full">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm">Scanning...</span>
              </div>
            )}
          </>
        )}
      </div>

      <p className="text-sm text-gray-500 text-center">
        Center the barcode within the box for best results
      </p>
    </div>
  );
}