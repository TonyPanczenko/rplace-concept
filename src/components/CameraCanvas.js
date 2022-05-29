import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedPixel } from '../store/canvas';
import PixelTooltip from './PixelTooltip';
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
import { canvasCoordsToImageCoords, imageCoordsToCanvasCoords, windowCoordsToCanvasCoords } from 'utils/canvas-helpers';

function CameraCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const dispatch = useDispatch();
  const pixels = useSelector((state) => state.canvas.pixels);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [pixelHoveredOn, setPixelHoveredOn] = useState(null);
  
  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = imageResX * canvasPxPerImagePx + 4 * cameraLineWidth * canvasPxDensity;
    canvas.height = imageResY * canvasPxPerImagePx + 4 * cameraLineWidth * canvasPxDensity;
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

  const findPixelCoordinates = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const canvasCoords = windowCoordsToCanvasCoords({ x: clientX, y: clientY }, canvas);
    return canvasCoordsToImageCoords(canvasCoords);
  };

  const drawNewCamera = (pixelCoordinates) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const canvasCoords = imageCoordsToCanvasCoords(pixelCoordinates);
    drawCameraSelector(
      imageCoordsToCanvasCoords(canvasCoords.x), 
      imageCoordsToCanvasCoords(canvasCoords.y),
      canvasPxPerImagePx,
      cameraSelectorSize * canvasPxDensity,
      cameraPrimaryColor
    );
    drawCameraSelector(
      imageCoordsToCanvasCoords(canvasCoords.x) - cameraLineWidth * canvasPxDensity, 
      imageCoordsToCanvasCoords(canvasCoords.y) - cameraLineWidth * canvasPxDensity,
      canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
      (cameraSelectorSize + 1) * canvasPxDensity,
      cameraSecondaryColor
    );
  };

  const selectPixel = (e) => {
    const pixelCoordinates = findPixelCoordinates(e.clientX, e.clientY);
    drawNewCamera(pixelCoordinates);
    const pixelId = pixelCoordinates.y * imageResX + pixelCoordinates.x;
    dispatch(setSelectedPixel(pixelId));
  };

  const handleMouseMove = ({ clientX, clientY }) => {
    const { x, y } = findPixelCoordinates(clientX, clientY);
    const pixelHoveredOn = pixels.find((px) => px.coordinates.x === x && px.coordinates.y === y);
    if (pixelHoveredOn) {
      setPixelHoveredOn(pixelHoveredOn);
      setTooltipVisible(true);
    } else {
      setPixelHoveredOn(null);
      setTooltipVisible(false);
    }
  };

  return (
    <>
      <canvas
        className={styles.canvas}
        onClick={selectPixel}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      ></canvas>
      {tooltipVisible &&
        <PixelTooltip 
          pixel={pixelHoveredOn}
          canvasRef={canvasRef}
        />
      }
    </>
  );
}

export default CameraCanvas;