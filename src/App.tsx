import React from 'react';
import { Header } from './components/layout/Header';
import ShippingForm from './components/shipping/ShippingForm';
import ShippingPreview from './components/shipping/ShippingPreview';
import { SavedAddresses } from './components/address/SavedAddresses';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useShippingData } from './hooks/useShippingData';

export default function App() {
  const { data, setData, generatePDF, isGenerating } = useShippingData();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ErrorBoundary>
                <ShippingForm onSubmit={setData} isGenerating={isGenerating} />
              </ErrorBoundary>
            </div>
            
            <div>
              <ErrorBoundary>
                <ShippingPreview 
                  data={data} 
                  onGenerate={generatePDF}
                  isGenerating={isGenerating}
                />
              </ErrorBoundary>
            </div>
          </div>

          <div className="mt-8">
            <ErrorBoundary>
              <SavedAddresses />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}