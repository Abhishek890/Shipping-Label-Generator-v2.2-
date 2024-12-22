export interface ImageProcessingOptions {
  contrast?: number;
  brightness?: number;
  threshold?: number;
  sharpen?: boolean;
}

export interface ProcessedImage {
  imageData: ImageData;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface BoundingBox {
  topLeft: Point;
  topRight: Point;
  bottomLeft: Point;
  bottomRight: Point;
}