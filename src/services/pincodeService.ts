import { PincodeInfo } from '../types/pincode';
import pincodeData from '../data/india-pincodes.json';

const PINCODE_CACHE: Record<string, PincodeInfo> = {};
const API_URL = 'https://api.postalpincode.in/pincode/';
const PINCODE_LENGTH = 6;

async function fetchPincodeFromAPI(pincode: string): Promise<PincodeInfo | null> {
  try {
    const response = await fetch(`${API_URL}${pincode}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (data[0]?.Status === "Success" && data[0].PostOffice?.length > 0) {
      return {
        city: data[0].PostOffice[0].District,
        state: data[0].PostOffice[0].State
      };
    }
    return null;
  } catch (error) {
    console.error('API lookup failed:', error.message);
    return null;
  }
}

function findPincodeInLocalData(pincode: string): PincodeInfo | null {
  const localResult = pincodeData.pincodes.find(p => p.pincode === pincode);
  return localResult ? { city: localResult.city, state: localResult.state } : null;
}

export async function lookupPincode(pincode: string): Promise<PincodeInfo | null> {
  // Input validation
  if (!pincode || pincode.length !== PINCODE_LENGTH) {
    throw new Error('Invalid pincode format');
  }

  // Check cache first
  if (PINCODE_CACHE[pincode]) {
    return PINCODE_CACHE[pincode];
  }

  // Try API first
  let result: PincodeInfo | null = await fetchPincodeFromAPI(pincode);
  
  // Fallback to local data if API fails
  if (!result) {
    result = findPincodeInLocalData(pincode);
  }

  // Cache the result if found
  if (result) {
    PINCODE_CACHE[pincode] = result;
  }

  return result;
}
