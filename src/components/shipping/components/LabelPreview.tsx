import React from 'react';
import { Package } from 'lucide-react';
import type { ShippingData } from '../../../types/shipping';
import { AddressBlock } from '../../AddressBlock';

interface LabelPreviewProps {
  data: ShippingData;
}

export function LabelPreview({ data }: LabelPreviewProps) {
  return (
    <div id="shipping-label" className="w-[170mm] mx-auto">
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <div className="flex items-center justify-center gap-2">
          <Package className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-center">Shipping Label</h1>
        </div>
      </div>

      <div className="space-y-6">
        <AddressBlock title="Deliver To:" address={data.to} />

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

        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs text-gray-500 text-center">
            This shipping label was generated on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}