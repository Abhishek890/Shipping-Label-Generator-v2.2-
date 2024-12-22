export interface ScanResult {
  code: string;
  confidence: number;
}

export interface BarcodeResult {
  codeResult?: {
    code: string;
    confidence: number;
    format: string;
  };
}

export interface QuaggaConfig {
  inputStream: {
    name: string;
    type: string;
    target: HTMLElement | null;
    constraints: {
      facingMode: string;
      width: { min: number };
      height: { min: number };
      aspectRatio: { min: number; max: number };
    };
    area: {
      top: string;
      right: string;
      left: string;
      bottom: string;
    };
  };
  decoder: {
    readers: string[];
    multiple: boolean;
    debug: {
      drawBoundingBox: boolean;
      showPattern: boolean;
    };
  };
  locate: boolean;
  frequency: number;
}

export interface ProcessedResult {
  boxes?: any[];
  box?: any;
  line?: any;
  codeResult?: {
    code: string;
  };
}