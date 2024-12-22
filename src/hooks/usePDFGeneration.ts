import { useState, useCallback } from 'react';
import { generatePDF } from '../utils/pdf/generator';
import type { ShippingData } from '../types/shipping';

export function usePDFGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = useCallback(async (data: ShippingData) => {
    setIsGenerating(true);
    try {
      await generatePDF('shipping-label', `shipping-label-${Date.now()}.pdf`);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generatePDF: generate,
    isGenerating
  };
}