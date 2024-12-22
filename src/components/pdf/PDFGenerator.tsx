import React from 'react';
import { usePDFGeneration } from '../../hooks/usePDFGeneration';
import type { ShippingData } from '../../types/shipping';

interface PDFGeneratorProps {
  data: ShippingData;
  onGenerate: () => void;
}

export function PDFGenerator({ data, onGenerate }: PDFGeneratorProps) {
  const { generatePDF, isGenerating } = usePDFGeneration();

  const handleGenerate = async () => {
    try {
      await generatePDF(data);
      onGenerate();
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className={`w-full py-2 px-4 rounded ${
        isGenerating ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
      } text-white`}
    >
      {isGenerating ? 'Generating...' : 'Generate PDF'}
    </button>
  );
}