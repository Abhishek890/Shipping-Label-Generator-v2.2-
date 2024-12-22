import { adjustContrast } from './filters/contrast';
import { adjustBrightness } from './filters/brightness';
import { applyThreshold } from './filters/threshold';
import { sharpenImage } from './filters/sharpen';
import type { ImageProcessingOptions, ProcessedImage } from './types';

export class ImageProcessor {
  static async process(
    imageData: ImageData,
    options: ImageProcessingOptions = {}
  ): Promise<ProcessedImage> {
    let processed = imageData;

    // Apply contrast adjustment if specified
    if (typeof options.contrast === 'number') {
      processed = adjustContrast(processed, options.contrast);
    }

    // Apply brightness adjustment if specified
    if (typeof options.brightness === 'number') {
      processed = adjustBrightness(processed, options.brightness);
    }

    // Apply sharpening if requested
    if (options.sharpen) {
      processed = sharpenImage(processed);
    }

    // Apply thresholding if specified
    if (typeof options.threshold === 'number') {
      processed = applyThreshold(processed, options.threshold);
    }

    return {
      imageData: processed,
      width: processed.width,
      height: processed.height
    };
  }

  static async createOptimizedVersions(
    imageData: ImageData
  ): Promise<ProcessedImage[]> {
    const versions: ProcessedImage[] = [];

    // Version 1: High contrast + sharpening
    versions.push(await this.process(imageData, {
      contrast: 50,
      sharpen: true,
      threshold: 128
    }));

    // Version 2: Brightness boost + moderate contrast
    versions.push(await this.process(imageData, {
      brightness: 30,
      contrast: 30,
      threshold: 150
    }));

    // Version 3: Maximum contrast for challenging barcodes
    versions.push(await this.process(imageData, {
      contrast: 100,
      threshold: 128
    }));

    return versions;
  }
}