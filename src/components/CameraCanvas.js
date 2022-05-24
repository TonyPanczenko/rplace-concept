import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setSelectedPixel } from '../store/canvas';
import styles from '../styles/camera-canvas.module.scss';

function CameraCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imageResX = 100;
  const imageResY = 100;
  const imagePxSize = 10;
  const canvasPxDensity = 2;
  const canvasPxPerImagePx = imagePxSize * canvasPxDensity;
  const cameraLineWidth = 1;
  // const cameraLineDashLength = [3, 4, 3];
  const cameraPrimaryColor = '#000000';
  const cameraSecondaryColor = '#dddddd';
  const dispatch = useDispatch();

  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = imageResX * canvasPxPerImagePx;
    canvas.height = imageResY * canvasPxPerImagePx;
    const ctx = canvas.getContext('2d');
    ctx.scale(canvasPxDensity, canvasPxDensity);
    ctx.lineWidth = cameraLineWidth * canvasPxDensity;
    ctxRef.current = ctx; 
  };

  const selectPixel = ({ offsetX, offsetY }) => {
    console.log([offsetX, offsetY]);
    const imageCoords = {
      x: Math.floor(offsetX / canvasPxPerImagePx),
      y: Math.floor(offsetY / canvasPxPerImagePx)
    };
    const leftCornerCoords = {
      x: imageCoords.x * canvasPxPerImagePx,
      y: imageCoords.y * canvasPxPerImagePx
    };
    const pixelId = imageCoords.y * imageResX + imageCoords.x;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = cameraPrimaryColor;
    ctx.beginPath();
    ctx.moveTo(leftCornerCoords.x, leftCornerCoords.y);
    ctx.lineTo(300, 100);
    ctx.stroke();
    ctx.strokeStyle = cameraSecondaryColor;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.stroke();
    dispatch(setSelectedPixel(pixelId));
  };

  return (
    <canvas
      className={styles.canvas}
      onMouseDown={selectPixel}
      ref={canvasRef}
    ></canvas>
  );
}

export default CameraCanvas;