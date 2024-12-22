import { useState, useCallback } from 'react';
import type { ShippingData } from '../types/shipping';
import { generatePDF } from '../utils/pdfGenerator';
import { DEFAULT_SENDER } from '../config/defaultSender';
import { addressService } from '../services/addressService';

export function useShippingData() {
  const [data, setData] = useState<ShippingData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSetData = useCallback((formData: ShippingData) => {
    const newData = {
      ...formData,
      from: DEFAULT_SENDER,
      status: 'pending' as const
    };
    setData(newData);
    
    // Save customer address
    addressService.saveNewAddress({
      name: newData.to.name,
      address: newData.to.address,
      city: newData.to.city,
      state: newData.to.state,
      pincode: newData.to.pincode,
      phone: newData.to.phone
    });
  }, []);

  const handleGeneratePDF = useCallback(async () => {
    if (!data) return;
    
    setIsGenerating(true);
    try {
      await generatePDF('shipping-label', `shipping-label-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [data]);

  return {
    data,
    setData: handleSetData,
    generatePDF: handleGeneratePDF,
    isGenerating
  };
}