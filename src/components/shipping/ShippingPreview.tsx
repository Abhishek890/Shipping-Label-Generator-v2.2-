import React from 'react';
import { Package, Download } from 'lucide-react';
import type { ShippingData } from '../../types/shipping';

interface ShippingPreviewProps {
  data: ShippingData | null;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function ShippingPreview({ data, onGenerate, isGenerating }: ShippingPreviewProps) {
  if (!data) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          <p>Fill out the form to generate a shipping label</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div id="shipping-label" className="w-full max-w-[170mm] mx-auto">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <div className="flex items-center justify-center gap-2">
            <Package className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-center">Shipping Label</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold bg-gray-100 p-2">Deliver To:</h2>
            <div className="p-4 border-2 border-gray-400 rounded">
              <p className="font-bold">{data.to.name}</p>
              <p className="mt-1">{data.to.address}</p>
              <p>{data.to.city}, {data.to.state}</p>
              <p>PIN: {data.to.pincode}</p>
              <p>Phone: {data.to.phone}</p>
            </div>
          </div>

          {/* Return Address */}
          <div className="border-t-2 border-dashed border-gray-300 pt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Return if not delivered to:
              </h3>
              <div className="p-3 border border-gray-300 rounded bg-white text-sm">
                <p className="font-medium">{data.from.name}</p>
                <p>{data.from.address}</p>
                <p>{data.from.city}, {data.from.state} - {data.from.pincode}</p>
                <p>Phone: {data.from.phone}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-xs text-gray-500 text-center">
              This shipping label was generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition-colors ${
          isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <Download className="w-5 h-5" />
        {isGenerating ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </div>
  );
}