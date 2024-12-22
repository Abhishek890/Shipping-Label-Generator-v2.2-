import { usePDF } from 'react-to-pdf';

export const generateShippingLabelPDF = (ref: React.RefObject<HTMLElement>) => {
  const { toPDF } = usePDF({
    filename: 'shipping-label.pdf',
    page: { format: 'A4' }
  });

  return toPDF;
};