import cv from 'opencv.js';

export class ImageEnhancer {
  private static async loadImage(imageData: ImageData): Promise<cv.Mat> {
    const mat = cv.matFromImageData(imageData);
    return mat;
  }

  static async enhanceImage(imageData: ImageData): Promise<ImageData> {
    const src = await this.loadImage(imageData);
    
    try {
      // Convert to grayscale
      const gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

      // Apply Gaussian blur to reduce noise
      const blurred = new cv.Mat();
      const ksize = new cv.Size(5, 5);
      cv.GaussianBlur(gray, blurred, ksize, 0);

      // Apply adaptive thresholding
      const binary = new cv.Mat();
      cv.adaptiveThreshold(
        blurred,
        binary,
        255,
        cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv.THRESH_BINARY,
        11,
        2
      );

      // Enhance edges
      const edges = new cv.Mat();
      cv.Canny(binary, edges, 50, 150);

      // Dilate to connect broken parts
      const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3));
      const dilated = new cv.Mat();
      cv.dilate(edges, dilated, kernel);

      // Convert back to ImageData
      const result = new cv.Mat();
      cv.cvtColor(dilated, result, cv.COLOR_GRAY2RGBA);
      
      const resultData = new ImageData(
        new Uint8ClampedArray(result.data),
        result.cols,
        result.rows
      );

      // Cleanup
      src.delete();
      gray.delete();
      blurred.delete();
      binary.delete();
      edges.delete();
      kernel.delete();
      dilated.delete();
      result.delete();

      return resultData;
    } catch (error) {
      src.delete();
      throw error;
    }
  }
}