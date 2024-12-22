export interface PDFOptions {
  scale: number;
  format: string;
  unit: string;
  orientation: 'portrait' | 'landscape';
}

export interface PDFGenerationResult {
  success: boolean;
  error?: string;
}