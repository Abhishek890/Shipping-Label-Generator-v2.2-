import { PincodeInfo } from '../types/pincode';
import pincodeData from '../data/india-pincodes.json';

const PINCODE_CACHE: Record<string, PincodeInfo> = {};

async function fetchPincodeFromAPI(pincode: string): Promise<PincodeInfo | null> {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    
    if (data[0]?.Status === "Success" && data[0].PostOffice?.length > 0) {
      return {
        city: data[0].PostOffice[0].District,
        state: data[0].PostOffice[0].State
      };
    }
    return null;
  } catch (error) {
    console.error('API lookup failed:', error);
    return null;
  }
}

function findPincodeInLocalData(pincode: string): PincodeInfo | null {
  const localResult = pincodeData.pincodes.find(p => p.pincode === pincode);
  if (localResult) {
    return {
      city: localResult.city,
      state: localResult.state
    };
  }
  return null;
}

export async function lookupPincode(pincode: string): Promise<PincodeInfo | null> {
  // Input validation
  if (!pincode || pincode.length !== 6) {
    throw new Error('Invalid pincode format');
  }

  // Check cache first
  if (PINCODE_CACHE[pincode]) {
    return PINCODE_CACHE[pincode];
  }

  try {
    // Try API first
    const apiResult = await fetchPincodeFromAPI(pincode);
    if (apiResult) {
      PINCODE_CACHE[pincode] = apiResult;
      return apiResult;
    }

    // Fallback to local data
    const localResult = findPincodeInLocalData(pincode);
    if (localResult) {
      PINCODE_CACHE[pincode] = localResult;
      return localResult;
    }

    return null;
  } catch (error) {
    console.error('Error in pincode lookup:', error);
    return null;
  }
}