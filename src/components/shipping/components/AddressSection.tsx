import React from 'react';
import { Truck } from 'lucide-react';
import { FormSection } from '../../FormSection';
import { AddressFields } from '../../AddressFields';
import type { Address } from '../../../types/shipping';

interface AddressSectionProps {
  title: string;
  data: Address;
  onChange: (field: string, value: string) => void;
  nameLabel?: string;
  readOnly?: boolean;
}

export function AddressSection({ 
  title, 
  data, 
  onChange, 
  nameLabel = "Name",
  readOnly = false 
}: AddressSectionProps) {
  if (readOnly) {
    return (
      <FormSection title={title} icon={Truck}>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 gap-2">
            <p><span className="font-semibold">Name:</span> {data.name}</p>
            <p><span className="font-semibold">Address:</span> {data.address}</p>
            <p><span className="font-semibold">City:</span> {data.city}</p>
            <p><span className="font-semibold">State:</span> {data.state}</p>
            <p><span className="font-semibold">PIN:</span> {data.pincode}</p>
            <p><span className="font-semibold">Phone:</span> {data.phone}</p>
          </div>
        </div>
      </FormSection>
    );
  }

  return (
    <FormSection title={title} icon={Truck}>
      <AddressFields
        data={data}
        onChange={onChange}
        nameLabel={nameLabel}
      />
    </FormSection>
  );
}