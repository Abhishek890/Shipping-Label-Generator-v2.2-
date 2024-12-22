import React from 'react';
import { Package } from 'lucide-react';
import type { ShippingData } from '../types/shipping';

interface ShippingLabelProps {
  data: ShippingData;
}

export default function ShippingLabel({ data }: ShippingLabelProps) {
  return (
    <div className="w-[210mm] bg-white" style={{ minHeight: '297mm' }}>
      <div className="p-8">
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <div className="flex items-center justify-center gap-2">
            <Package className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-center">Shipping Label</h1>
          </div>
        </div>

        <div className="space-y-8">
          {/* Customer Address (To Address) */}
          <div>
            <h2 className="text-lg font-semibold mb-2 bg-gray-100 p-2">Deliver To:</h2>
            <div className="p-4 border-2 border-gray-400 rounded">
              <p className="font-bold text-lg">{data.to.name}</p>
              <p className="mt-2">{data.to.address}</p>
              <p className="mt-1">{data.to.city}, {data.to.state}</p>
              <p className="mt-1">PIN: {data.to.pincode}</p>
              <p className="mt-1">Phone: {data.to.phone}</p>
            </div>
          </div>

          {/* Return Address */}
          <div>
            <h2 className="text-lg font-semibold mb-2 bg-gray-100 p-2">Return if not delivered to:</h2>
            <div className="p-4 border-2 border-gray-400 rounded">
              <p className="font-bold text-lg">{data.from.name}</p>
              <p className="mt-2">{data.from.address}</p>
              <p className="mt-1">{data.from.city}, {data.from.state}</p>
              <p className="mt-1">PIN: {data.from.pincode}</p>
              <p className="mt-1">Phone: {data.from.phone}</p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="border-2 border-gray-800 p-4">
            <p className="text-center font-semibold mb-2">Important Notice</p>
            <p className="text-sm text-center">This is a system generated shipping label.</p>
            <p className="text-sm text-center mt-1">Please handle with care.</p>
          </div>
        </div>
      </div>
    </div>
  );
}