import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { ShippingData } from '../../types/shipping';
import { DEFAULT_SENDER } from '../../config/defaultSender';
import { AddressSection } from './components/AddressSection';

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
      <AddressSection
        title="From Address (Pre-filled)"
        data={formData.from}
        onChange={() => {}}
        readOnly
      />

      <div className="flex justify-center">
        <ArrowRight className="w-6 h-6 text-gray-400" />
      </div>

      <AddressSection
        title="To Address"
        data={formData.to}
        onChange={(field, value) => updateField('to', field, value)}
        nameLabel="Recipient Name"
      />

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