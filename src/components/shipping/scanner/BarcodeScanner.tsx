import React, { useState } from 'react';
import { X, Camera, Upload, Loader } from 'lucide-react';
import { useScanner } from './hooks/useScanner';
import { ImageUploader } from './ImageUploader';
import { ScannerPreview } from './ScannerPreview';
import { ScannerError } from './ScannerError';
import { ScannerControls } from './ScannerControls';

interface BarcodeScannerProps {
  onScan: (trackingNumber: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const {
    videoRef,
    error,
    isScanning,
    isInitializing,
    scanImage,
    startScanning,
    stopScanning
  } = useScanner({ onScan });

  const handleModeSwitch = (newMode: 'camera' | 'upload') => {
    if (mode === 'camera') {
      stopScanning();
    }
    setMode(newMode);
    if (newMode === 'camera') {
      startScanning();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Scan Barcode
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleModeSwitch('camera')}
            className={`p-2 rounded ${
              mode === 'camera' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            title="Use Camera"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleModeSwitch('upload')}
            className={`p-2 rounded ${
              mode === 'upload' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            title="Upload Image"
          >
            <Upload className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {error ? (
          <ScannerError error={error} />
        ) : mode === 'camera' ? (
          <ScannerPreview
            videoRef={videoRef}
            isScanning={isScanning}
            isInitializing={isInitializing}
          />
        ) : (
          <ImageUploader onImageSelect={scanImage} />
        )}
      </div>

      <ScannerControls mode={mode} isScanning={isScanning} />
    </div>
  );
}