import { useState } from 'react';
import { lookupPincode } from '../services/pincodeService';
import type { PincodeInfo } from '../types/pincode';

interface UsePincodeLookupResult {
  handlePincodeLookup: (pincode: string, onSuccess: (city: string, state: string) => void) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function usePincodeLookup(): UsePincodeLookupResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePincodeLookup = async (
    pincode: string,
    onSuccess: (city: string, state: string) => void
  ): Promise<void> => {
    if (pincode.length !== 6) {
      setError('Pincode must be 6 digits');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await lookupPincode(pincode);
      if (result) {
        onSuccess(result.city, result.state);
        setError(null);
      } else {
        setError('Invalid pincode or no data found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error looking up pincode');
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePincodeLookup, isLoading, error };
}