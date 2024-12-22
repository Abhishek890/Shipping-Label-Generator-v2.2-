import Quagga from 'quagga';
import type { ProcessedResult } from '../types';

export function drawResult(result: ProcessedResult): void {
  const drawingCtx = Quagga.canvas.ctx.overlay;
  const drawingCanvas = Quagga.canvas.dom.overlay;

  if (!drawingCtx || !drawingCanvas) return;

  // Clear canvas
  const width = parseInt(drawingCanvas.getAttribute("width") || "0");
  const height = parseInt(drawingCanvas.getAttribute("height") || "0");
  drawingCtx.clearRect(0, 0, width, height);

  // Draw boxes
  if (result.boxes) {
    result.boxes
      .filter(box => box !== result.box)
      .forEach(box => {
        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
          color: "rgba(0, 255, 0, 0.4)",
          lineWidth: 2
        });
      });
  }

  // Draw main box
  if (result.box) {
    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
      color: "rgba(0, 0, 255, 0.7)",
      lineWidth: 3
    });
  }

  // Draw scan line
  if (result.codeResult?.code && result.line) {
    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, {
      color: 'rgba(255, 0, 0, 0.7)',
      lineWidth: 4
    });
  }
}