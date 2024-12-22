import Quagga from 'quagga';
import { ImageProcessor } from './imageProcessor';
import type { ProcessedImage } from './types';

export async function scanBarcodeWithEnhancement(
  imageData: ImageData,
  maxAttempts: number = 3
): Promise<string | null> {
  // Try scanning original image first
  const originalResult = await scanWithQuagga(imageData);
  if (originalResult) return originalResult;

  try {
    // Get optimized versions of the image
    const processedVersions = await ImageProcessor.createOptimizedVersions(imageData);
    
    // Try scanning each processed version
    for (const processed of processedVersions) {
      const result = await scanWithQuagga(processed.imageData);
      if (result) return result;
    }

    // If still no result, try additional processing with different parameters
    for (let i = 0; i < maxAttempts - 1; i++) {
      const customProcessed = await ImageProcessor.process(imageData, {
        contrast: 30 + (i * 20),
        brightness: 20 + (i * 10),
        sharpen: true,
        threshold: 128 + (i * 20)
      });
      
      const result = await scanWithQuagga(customProcessed.imageData);
      if (result) return result;
    }

    return null;
  } catch (error) {
    console.error('Error during barcode enhancement:', error);
    return null;
  }
}

async function scanWithQuagga(imageData: ImageData): Promise<string | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(null);
      return;
    }

    ctx.putImageData(imageData, 0, 0);

    Quagga.decodeSingle({
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "upc_reader",
          "upc_e_reader",
          "codabar_reader",
          "i2of5_reader"
        ],
        multiple: false
      },
      locate: true,
      src: canvas.toDataURL()
    }, (result) => {
      if (result?.codeResult) {
        resolve(result.codeResult.code);
      } else {
        resolve(null);
      }
    });
  });
}