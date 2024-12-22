export interface PDFOptions {
  filename: string;
  page: {
    format: string;
    orientation: 'portrait' | 'landscape';
  };
  method: 'save' | 'open';
}