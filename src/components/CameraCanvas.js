import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

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

function CameraCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const dispatch = useDispatch();
  const pixels = useSelector((state) => state.canvas.pixels);
  const [tooltipCoords, setTooltipCoords] = useState({ x: 0, y: 0 }); 
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [pixelHoveredOn, setPixelHoveredOn] = useState(null);

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
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width / canvasPxDensity;
    const scaleY = canvas.height / rect.height / canvasPxDensity;
    return {
      x: Math.floor((clientX - rect.left) * scaleX / canvasPxPerImagePx),
      y: Math.floor((clientY - rect.top) * scaleY / canvasPxPerImagePx)
    };
  };

  const selectPixel = (e) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const pixelCoordinates = findPixelCoordinates(e.clientX, e.clientY);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCameraSelector(
      pixelCoordinates.x * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity, 
      pixelCoordinates.y * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
      canvasPxPerImagePx,
      cameraSelectorSize * canvasPxDensity,
      cameraPrimaryColor
    );
    drawCameraSelector(
      pixelCoordinates.x * canvasPxPerImagePx + cameraLineWidth * canvasPxDensity, 
      pixelCoordinates.y * canvasPxPerImagePx + cameraLineWidth * canvasPxDensity,
      canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
      (cameraSelectorSize + 1) * canvasPxDensity,
      cameraSecondaryColor
    );
    const pixelId = pixelCoordinates.y * imageResX + pixelCoordinates.x;
    dispatch(setSelectedPixel(pixelId));
  };

  const handleMouseMove = ({ clientX, clientY }) => {
    const { x, y } = findPixelCoordinates(clientX, clientY);
    setPixelHoveredOn(pixels.find((px) => px.coordinates.x === x && px.coordinates.y === y));
    if (pixelHoveredOn) { 
      setTooltipCoords({ clientX, clientY });
      setTooltipVisible(true);
    }
  };

  const debouncedHandleMouseMove = useRef((e) => {
    setTooltipVisible(false);
    debounce(handleMouseMove(e), 500);
  });

  useEffect(() => {
    initCanvas();
  }, []);

  return (
    <>
      <canvas
        className={styles.canvas}
        onClick={selectPixel}
        onMouseMove={debouncedHandleMouseMove.current}
        ref={canvasRef}
      ></canvas>
      {tooltipVisible &&
        <PixelTooltip 
          pixel={pixelHoveredOn} 
          style={{left: `${tooltipCoords.x}px`, top: `${tooltipCoords.y}px`}}
        />
      }
    </>
  );
}

export default CameraCanvas;