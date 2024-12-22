import { useRef, useEffect, useState } from 'react';
import { QuaggaInitializer } from './QuaggaInitializer';
import { DEFAULT_SCANNER_CONFIG } from './config';
import type { ScanResult, ProcessedResult } from './types';
import { drawResult } from './utils/drawingUtils';
import { validateScanResult } from './utils/validationUtils';
import { playSuccessSound } from './utils/audioUtils';
import { scanBarcodeWithEnhancement } from '../../../utils/imageProcessing/scanner';

interface UseScannerProps {
  onScan: (code: string) => void;
  targetRef: React.RefObject<HTMLDivElement>;
}

export function useScanner({ onScan, targetRef }: UseScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const resultsBufferRef = useRef<Array<{ code: string; confidence: number }>>([]);
  const quaggaInstance = QuaggaInitializer.getInstance();

  useEffect(() => {
    if (!targetRef.current) return;

    const config = {
      ...DEFAULT_SCANNER_CONFIG,
      inputStream: {
        ...DEFAULT_SCANNER_CONFIG.inputStream,
        target: targetRef.current
      }
    };

    const handleDetected = async (result: ScanResult) => {
      if (!result.codeResult?.code) return;

      const { code, confidence, format } = result.codeResult;
      
      if (validateScanResult(code, confidence, format, resultsBufferRef.current)) {
        playSuccessSound();
        onScan(code);
        quaggaInstance.stop();
        return;
      }

      // If standard scanning fails, try enhanced scanning
      try {
        const canvas = document.createElement('canvas');
        const video = targetRef.current?.querySelector('video');
        if (!video) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        const enhancedResult = await scanBarcodeWithEnhancement(imageData);
        if (enhancedResult) {
          playSuccessSound();
          onScan(enhancedResult);
          quaggaInstance.stop();
        }
      } catch (error) {
        console.error('Enhanced scanning failed:', error);
      }
    };

    const handleProcessed = (result: ProcessedResult) => {
      if (!result) return;
      drawResult(result);
    };

    const initializeScanner = async () => {
      try {
        await quaggaInstance.initialize(config);
        quaggaInstance.onDetected(handleDetected);
        quaggaInstance.onProcessed(handleProcessed);
        await quaggaInstance.start();
        setIsScanning(true);
      } catch (err) {
        setError("Failed to start camera. Please ensure camera access is allowed.");
        console.error("Scanner initialization failed:", err);
      }
    };

    initializeScanner();

    return () => {
      quaggaInstance.offDetected(handleDetected);
      quaggaInstance.offProcessed(handleProcessed);
      quaggaInstance.stop();
    };
  }, [onScan, targetRef]);

  return { error, isScanning };
}