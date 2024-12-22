import React, { forwardRef } from 'react';
import type { ShippingDetails, ProductDetails, RtoAddress } from '../types/shipping';
import ShippingLabel from './ShippingLabel';

interface PDFContainerProps {
  shipping: ShippingDetails;
  product: ProductDetails;
  rto: RtoAddress;
}

export const PDFContainer = forwardRef<HTMLDivElement, PDFContainerProps>(
  ({ shipping, product, rto }, ref) => {
    return (
      <div ref={ref} className="bg-white p-8 rounded-lg shadow-md w-[210mm] mx-auto">
        <ShippingLabel
          shipping={shipping}
          product={product}
          rto={rto}
        />
      </div>
    );
  }
);