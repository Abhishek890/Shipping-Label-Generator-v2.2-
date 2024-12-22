import type { ScanResult } from '../types';

const CONFIDENCE_THRESHOLD = 0.7;
const REQUIRED_CONSECUTIVE_MATCHES = 2;

export function validateBarcode(
  code: string,
  confidence: number,
  buffer: ScanResult[]
): boolean {
  if (confidence < CONFIDENCE_THRESHOLD) {
    console.debug('Low confidence scan:', confidence);
    return false;
  }

  // Update buffer
  buffer.push({ code, confidence });
  if (buffer.length > REQUIRED_CONSECUTIVE_MATCHES) {
    buffer.shift();
  }

  // Check for consecutive matches
  return buffer.length >= REQUIRED_CONSECUTIVE_MATCHES &&
    buffer.every(result => result.code === code);
}