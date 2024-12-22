import Quagga from 'quagga';

export async function scanBarcodeFromImage(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const image = new Image();
      image.src = e.target?.result as string;
      
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(image, 0, 0);
        
        Quagga.decodeSingle({
          decoder: {
            readers: [
              "code_128_reader",
              "ean_reader",
              "ean_8_reader",
              "code_39_reader",
              "upc_reader"
            ]
          },
          locate: true,
          src: canvas.toDataURL()
        }, (result) => {
          if (result?.codeResult) {
            resolve(result.codeResult.code);
          } else {
            resolve(null);
          }
        });
      };
      
      image.onerror = () => reject(new Error('Failed to load image'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}