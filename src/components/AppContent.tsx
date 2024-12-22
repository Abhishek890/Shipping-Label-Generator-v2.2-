import React, { useCallback, useState } from 'react';
import { ShippingForm } from './ShippingForm';
import { PDFContainer } from './PDFContainer';
import { ErrorMessage } from './ErrorMessage';
import type { FormData } from '../types/shipping';
import { usePDF } from 'react-to-pdf';
import { PDFGenerator } from '../utils/pdfGenerator';

export function AppContent() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toPDF } = usePDF({
    filename: 'shipping-label.pdf',
    method: 'save',
    page: {
      format: 'a4',
      orientation: 'portrait',
      margin: 0
    }
  });

  const pdfGenerator = React.useMemo(() => new PDFGenerator({ toPDF }), [toPDF]);

  const handleFormSubmit = useCallback(async (data: FormData) => {
    setError(null);
    setFormData(data);
    setIsGeneratingPDF(true);

    try {
      await pdfGenerator.generatePDF(data);
    } catch (err) {
      console.error('Failed to generate shipping label:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [pdfGenerator]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {error && <ErrorMessage message={error} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ShippingForm 
            onSubmit={handleFormSubmit} 
            isGeneratingPDF={isGeneratingPDF}
          />
        </div>
        
        <div className="hidden lg:block">
          <div className="sticky top-8">
            {formData ? (
              <PDFContainer
                shipping={formData.shipping}
                product={formData.product}
                rto={formData.rto}
              />
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="h-[600px] flex items-center justify-center text-gray-500">
                  <p>Fill out the form to generate a shipping label</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}