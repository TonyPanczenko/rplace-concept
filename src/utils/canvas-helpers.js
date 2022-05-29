import { canvasPxDensity, canvasPxPerImagePx, cameraLineWidth } from './canvas-config';

export const imagePxCoordToCanvasCoord = (n) => {
  return n * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity;
};