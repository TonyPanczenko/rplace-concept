import axios from 'axios';
import { useEffect, useRef } from 'react';

function CanvasContainer() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imageResX = 100;
  const imageResY = 100;
  const imagePxSize = 10;
  const canvasPxDensity = 2;
  const canvasPxPerImagePx = imagePxSize * canvasPxDensity;

  useEffect(() => {
    initCanvas();
    getImage();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = imageResX * canvasPxPerImagePx;
    canvas.height = imageResY * canvasPxPerImagePx;
    const ctx = canvas.getContext('2d');
    ctx.scale(canvasPxDensity, canvasPxDensity);
    ctxRef.current = ctx; 
  };

  const getImage = async () => {
    const res = await axios.get(`${process.env.API_URL}/get-image`);
    res.data.pixels.forEach(({ Coordinates, Color }) => {
      ctxRef.fillStyle = Color;
      ctxRef.fillRect(
        Coordinates.x * canvasPxPerImagePx,
        Coordinates.y * canvasPxPerImagePx,
        canvasPxPerImagePx,
        canvasPxPerImagePx
      );
    });
  };

  const selectPixel = ({ offsetX, offsetY }) => {
    
  };

  return (
    <canvas
      style={{ width: '100%', height: '100%' }}
      onMouseDown={selectPixel}
      ref={canvasRef}
    ></canvas>
  );
}

export default CanvasContainer;