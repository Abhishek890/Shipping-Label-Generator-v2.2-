import type { QuaggaConfig } from './types';

export const DEFAULT_SCANNER_CONFIG: QuaggaConfig = {
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: null,
    constraints: {
      facingMode: "environment",
      width: { min: 1280 },
      height: { min: 720 },
      aspectRatio: { min: 1, max: 2 }
    },
    area: {
      top: "10%",
      right: "10%",
      left: "10%",
      bottom: "10%",
    }
  },
  decoder: {
    readers: [
      "code_128_reader",
      "ean_reader",
      "ean_8_reader",
      "code_39_reader",
      "upc_reader"
    ],
    multiple: false,
    debug: {
      drawBoundingBox: true,
      showPattern: true
    }
  },
  locate: true,
  frequency: 10
};