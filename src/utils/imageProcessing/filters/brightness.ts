export function adjustBrightness(imageData: ImageData, brightness: number): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] + brightness);
    data[i + 1] = Math.min(255, data[i + 1] + brightness);
    data[i + 2] = Math.min(255, data[i + 2] + brightness);
  }

  return new ImageData(data, imageData.width, imageData.height);
}