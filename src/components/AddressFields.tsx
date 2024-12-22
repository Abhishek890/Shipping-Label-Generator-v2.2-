import React from 'react';
import { Input } from './Input';
import type { Address } from '../types/shipping';

interface AddressFieldsProps {
  data: Address;
  onChange: (field: string, value: string) => void;
  nameLabel?: string;
}

export function AddressFields({ data, onChange, nameLabel = "Name" }: AddressFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label={nameLabel}
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        required
      />
      <Input
        label="Address"
        value={data.address}
        onChange={(e) => onChange('address', e.target.value)}
        className="md:col-span-2"
        required
      />
      <Input
        label="Pincode"
        value={data.pincode}
        onChange={(e) => onChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
        maxLength={6}
        required
      />
      <Input
        label="City"
        value={data.city}
        onChange={(e) => onChange('city', e.target.value)}
        required
      />
      <Input
        label="State"
        value={data.state}
        onChange={(e) => onChange('state', e.target.value)}
        required
      />
      <Input
        label="Phone"
        value={data.phone}
        onChange={(e) => onChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
        maxLength={10}
        required
      />
    </div>
  );
}