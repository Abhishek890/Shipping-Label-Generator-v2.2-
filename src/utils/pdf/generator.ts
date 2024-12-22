import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PDFOptions } from './types';

const DEFAULT_OPTIONS: PDFOptions = {
  scale: 2,
  format: 'a4',
  unit: 'mm',
  orientation: 'portrait'
};

export async function generatePDF(
  elementId: string,
  filename: string,
  options: Partial<PDFOptions> = {}
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Target element not found');
  }

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  try {
    const canvas = await createCanvas(element, mergedOptions);
    const pdf = createPDFDocument(mergedOptions);
    await addCanvasToPDF(canvas, pdf, mergedOptions);
    pdf.save(filename);
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF');
  }
}

async function createCanvas(
  element: HTMLElement,
  options: PDFOptions
): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    scale: options.scale,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });
}

function createPDFDocument(options: PDFOptions): jsPDF {
  return new jsPDF({
    orientation: options.orientation,
    unit: options.unit,
    format: options.format
  });
}

async function addCanvasToPDF(
  canvas: HTMLCanvasElement,
  pdf: jsPDF,
  options: PDFOptions
): Promise<void> {
  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(
    canvas.toDataURL('image/png'),
    'PNG',
    0,
    0,
    imgWidth,
    imgHeight
  );
}