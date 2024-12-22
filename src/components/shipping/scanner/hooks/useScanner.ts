import { useRef, useState, useEffect, useCallback } from 'react';
import Quagga from 'quagga';
import { scanBarcodeFromImage } from '../utils/imageScanner';
import { validateBarcode } from '../utils/validation';
import { SCANNER_CONFIG } from '../config';
import type { ScanResult } from '../types';

interface UseScannerProps {
  onScan: (code: string) => void;
}

export function useScanner({ onScan }: UseScannerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const resultsBuffer = useRef<ScanResult[]>([]);

  const handleScanResult = useCallback((result: ScanResult) => {
    if (!result?.codeResult?.code) return;

    const { code, confidence } = result.codeResult;
    console.debug('Scan result:', { code, confidence });

    if (validateBarcode(code, confidence, resultsBuffer.current)) {
      console.debug('Valid barcode detected:', code);
      onScan(code);
      stopScanning();
    }
  }, [onScan]);

  const startScanning = useCallback(async () => {
    if (!videoRef.current) return;

    setIsInitializing(true);
    setError(null);

    try {
      await new Promise((resolve, reject) => {
        Quagga.init(
          {
            ...SCANNER_CONFIG,
            inputStream: {
              ...SCANNER_CONFIG.inputStream,
              target: videoRef.current
            }
          },
          (err) => err ? reject(err) : resolve(undefined)
        );
      });

      Quagga.start();
      Quagga.onDetected(handleScanResult);
      setIsScanning(true);
    } catch (err) {
      console.error('Scanner initialization failed:', err);
      setError('Failed to start camera. Please ensure camera access is allowed.');
    } finally {
      setIsInitializing(false);
    }
  }, [handleScanResult]);

  const stopScanning = useCallback(() => {
    try {
      Quagga.stop();
      Quagga.offDetected(handleScanResult);
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
    setIsScanning(false);
  }, [handleScanResult]);

  const scanImage = useCallback(async (imageFile: File) => {
    setError(null);
    setIsScanning(true);

    try {
      const result = await scanBarcodeFromImage(imageFile);
      if (result) {
        onScan(result);
      } else {
        setError('No barcode found in image');
      }
    } catch (err) {
      console.error('Image scanning failed:', err);
      setError('Failed to scan image');
    } finally {
      setIsScanning(false);
    }
  }, [onScan]);

  useEffect(() => {
    startScanning();
    return () => stopScanning();
  }, [startScanning, stopScanning]);

  return {
    videoRef,
    error,
    isScanning,
    isInitializing,
    scanImage,
    startScanning,
    stopScanning
  };
}