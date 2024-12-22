import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_CONFIG = {
  WIDTH_MM: 210,
  HEIGHT_MM: 297,
  PADDING_MM: 20
} as const;

export async function generateLabel(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  try {
    const contentWidth = A4_CONFIG.WIDTH_MM - (2 * A4_CONFIG.PADDING_MM);
    const contentHeight = A4_CONFIG.HEIGHT_MM - (2 * A4_CONFIG.PADDING_MM);

    // Prepare element for capture
    const originalStyles = {
      width: element.style.width,
      padding: element.style.padding,
      background: element.style.background
    };

    element.style.width = `${contentWidth}mm`;
    element.style.padding = '0';
    element.style.background = 'white';

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      A4_CONFIG.PADDING_MM,
      A4_CONFIG.PADDING_MM,
      imgWidth,
      imgHeight
    );

    pdf.save(filename);

    // Restore original styles
    Object.assign(element.style, originalStyles);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}