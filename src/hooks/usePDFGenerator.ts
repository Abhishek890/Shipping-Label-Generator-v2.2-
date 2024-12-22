import { usePDF } from 'react-to-pdf';
import type { PDFOptions } from '../types/pdf';

const DEFAULT_OPTIONS: PDFOptions = {
  filename: 'shipping-label.pdf',
  page: {
    format: 'A4',
    orientation: 'portrait'
  },
  method: 'save'
};

export function usePDFGenerator(options: Partial<PDFOptions> = {}) {
  const { toPDF } = usePDF({
    ...DEFAULT_OPTIONS,
    ...options
  });

  const generatePDF = async (element: HTMLElement | null): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!element) {
        reject(new Error('No target element provided for PDF generation'));
        return;
      }

      // Wait for next frame to ensure component is rendered
      requestAnimationFrame(() => {
        // Double check element is still valid
        if (!element.isConnected) {
          reject(new Error('Target element is no longer in the document'));
          return;
        }

        toPDF(element)
          .then(() => resolve(true))
          .catch((error) => {
            console.error('Error generating PDF:', error);
            reject(new Error('Failed to generate PDF'));
          });
      });
    });
  };

  return { generatePDF };
}