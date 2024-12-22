import React from 'react';
import { Truck, ArrowRight } from 'lucide-react';
import { FormSection } from './FormSection';
import { AddressFields } from './AddressFields';
import type { ShippingData } from '../types/shipping';
import { DEFAULT_SENDER } from '../config/defaultSender';

interface ShippingFormProps {
  onSubmit: (data: ShippingData) => void;
  isGenerating: boolean;
}

export default function ShippingForm({ onSubmit, isGenerating }: ShippingFormProps) {
  const [formData, setFormData] = React.useState<ShippingData>({
    from: DEFAULT_SENDER,
    to: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (section: keyof ShippingData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection title="From Address (Pre-filled)" icon={Truck}>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 gap-2">
            <p><span className="font-semibold">Name:</span> {DEFAULT_SENDER.name}</p>
            <p><span className="font-semibold">Address:</span> {DEFAULT_SENDER.address}</p>
            <p><span className="font-semibold">City:</span> {DEFAULT_SENDER.city}</p>
            <p><span className="font-semibold">State:</span> {DEFAULT_SENDER.state}</p>
            <p><span className="font-semibold">PIN:</span> {DEFAULT_SENDER.pincode}</p>
            <p><span className="font-semibold">Phone:</span> {DEFAULT_SENDER.phone}</p>
          </div>
        </div>
      </FormSection>

      <div className="flex justify-center">
        <ArrowRight className="w-6 h-6 text-gray-400" />
      </div>

      <FormSection title="To Address" icon={Truck}>
        <AddressFields
          data={formData.to}
          onChange={(field, value) => updateField('to', field, value)}
          nameLabel="Recipient Name"
        />
      </FormSection>

      <button
        type="submit"
        disabled={isGenerating}
        className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
          isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isGenerating ? 'Generating Label...' : 'Generate Shipping Label'}
      </button>
    </form>
  );
}