import { canvasPxDensity, canvasPxPerImagePx, cameraLineWidth } from './canvas-config';

export const imageCoordsToCanvasCoords = ({ x, y }) => {
  return {
    x: x * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
    y: y * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity
  };
};

export const canvasCoordsToImageCoords = ({ x, y }) => {
  return {
    x: Math.floor((x - 2 * cameraLineWidth * canvasPxDensity) / canvasPxPerImagePx),
    y: Math.floor((y - 2 * cameraLineWidth * canvasPxDensity) / canvasPxPerImagePx)
  };
};

export const windowCoordsToCanvasCoords = ({ x, y }, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width / canvasPxDensity;
  const scaleY = canvas.height / rect.height / canvasPxDensity;
  const canvasCoords = {
    x: (x - rect.left) * scaleX, 
    y: (y - rect.top) * scaleY
  };
  return canvasCoords;
};

export const canvasCoordsToWindowCoords = ({ x, y }, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width / canvasPxDensity;
  const scaleY = canvas.height / rect.height / canvasPxDensity;
  const windowCoords = {
    x: (x / scaleX) + rect.left,
    y: (y / scaleY) + rect.top
  };
  return windowCoords;
};