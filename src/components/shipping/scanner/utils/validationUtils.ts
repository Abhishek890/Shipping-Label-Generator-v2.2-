interface ScanBuffer {
  code: string;
  confidence: number;
}

export function validateScanResult(
  code: string,
  confidence: number,
  format: string,
  buffer: ScanBuffer[]
): boolean {
  // Higher confidence threshold for Code-128
  const confidenceThreshold = format === 'code_128' ? 0.85 : 0.7;
  
  if (confidence < confidenceThreshold) return false;

  // Update buffer
  buffer.push({ code, confidence });
  if (buffer.length > 3) {
    buffer.shift();
  }

  // Check for consistent results
  return buffer.length >= 2 && buffer.every(result => result.code === code);
}