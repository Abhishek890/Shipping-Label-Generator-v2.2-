import React from 'react';
import { Input } from './Input';
import type { Product } from '../types/shipping';

interface ProductFieldsProps {
  data: Product;
  onChange: (field: string, value: string | number) => void;
}

export function ProductFields({ data, onChange }: ProductFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="Product Name"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        className="md:col-span-2"
        required
      />
      <Input
        label="Quantity"
        type="number"
        value={data.quantity}
        onChange={(e) => onChange('quantity', parseInt(e.target.value) || 0)}
        min={1}
        required
      />
      <Input
        label="Weight (kg)"
        type="number"
        value={data.weight}
        onChange={(e) => onChange('weight', parseFloat(e.target.value) || 0)}
        min={0.1}
        step={0.1}
        required
      />
      <Input
        label="Price (₹)"
        type="number"
        value={data.price}
        onChange={(e) => onChange('price', parseInt(e.target.value) || 0)}
        min={0}
        required
      />
    </div>
  );
}