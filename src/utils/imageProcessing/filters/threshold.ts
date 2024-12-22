export function applyThreshold(imageData: ImageData, threshold: number): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const value = avg > threshold ? 255 : 0;
    data[i] = data[i + 1] = data[i + 2] = value;
  }

  return new ImageData(data, imageData.width, imageData.height);
}