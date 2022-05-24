import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setSelectedPixel } from '../store/canvas';
import { 
  imageResX, 
  imageResY, 
  canvasPxPerImagePx,
  canvasPxDensity,
  cameraLineWidth,
  cameraSelectorSize,
  cameraPrimaryColor,
  cameraSecondaryColor 
} from '../utils/canvas-config.js';
import styles from '../styles/camera-canvas.module.scss';

function CameraCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const dispatch = useDispatch();

  const initCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = imageResX * canvasPxPerImagePx;
    canvas.height = imageResY * canvasPxPerImagePx;
    const ctx = canvas.getContext('2d');
    ctx.scale(canvasPxDensity, canvasPxDensity);
    ctx.lineWidth = cameraLineWidth * canvasPxDensity;
    ctxRef.current = ctx; 
  };

  const drawCameraSelector = (x, y, imagePxSize, selectorSize, color) => {
    const ctx = ctxRef.current;
    ctx.strokeStyle = color;
    ctx.setLineDash([
      selectorSize,
      (imagePxSize - 2 * selectorSize),
      2 * selectorSize,
      (imagePxSize - 2 * selectorSize),
      2 * selectorSize,
      (imagePxSize - 2 * selectorSize),
      2 * selectorSize,
      (imagePxSize - 2 * selectorSize),
      selectorSize
    ]);
    ctx.strokeRect(x, y, imagePxSize, imagePxSize);
  };

  const selectPixel = (e) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const imageCoords = {
      x: Math.floor(e.nativeEvent.offsetX * scaleX / canvasPxDensity / canvasPxPerImagePx),
      y: Math.floor(e.nativeEvent.offsetY * scaleY / canvasPxDensity / canvasPxPerImagePx)
    };
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCameraSelector(
      imageCoords.x * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity, 
      imageCoords.y * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
      canvasPxPerImagePx,
      cameraSelectorSize * canvasPxDensity,
      cameraPrimaryColor
    );
    drawCameraSelector(
      imageCoords.x * canvasPxPerImagePx + cameraLineWidth * canvasPxDensity, 
      imageCoords.y * canvasPxPerImagePx + cameraLineWidth * canvasPxDensity,
      canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
      (cameraSelectorSize + 1) * canvasPxDensity,
      cameraSecondaryColor
    );
    const pixelId = imageCoords.y * imageResX + imageCoords.x;
    dispatch(setSelectedPixel(pixelId));
  };

  useEffect(() => {
    initCanvas();
  }, []);

  return (
    <canvas
      className={styles.canvas}
      onClick={selectPixel}
      ref={canvasRef}
    ></canvas>
  );
}

export default CameraCanvas;