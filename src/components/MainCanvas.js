import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setPixels } from '../store/canvas';
import { 
  imageResX, 
  imageResY, 
  canvasPxPerImagePx,
  canvasPxDensity,
  cameraLineWidth
} from '../utils/canvas-config.js';
import styles from '../styles/main-canvas.module.scss';

function MainCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const dispatch = useDispatch();
  const pixels = useSelector((state) => state.canvas.pixels);

  useEffect(() => {
    initCanvas();
    downloadImage();
  }, []);

  useEffect(() => {
    console.log(pixels);
    if (!pixels) return;
    redrawCanvas(pixels);
  }, [pixels]);

  const redrawCanvas = (pixels) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixels.forEach(({ coordinates, color }) => {
      ctxRef.current.fillStyle = color;
      ctxRef.current.fillRect(
        coordinates.x * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
        coordinates.y * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
        canvasPxPerImagePx,
        canvasPxPerImagePx
      );
    });
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = imageResX * canvasPxPerImagePx + 4 * cameraLineWidth * canvasPxDensity;
    canvas.height = imageResY * canvasPxPerImagePx + 4 * cameraLineWidth * canvasPxDensity;
    const ctx = canvas.getContext('2d');
    ctx.scale(canvasPxDensity, canvasPxDensity);
    ctxRef.current = ctx; 
  };

  const downloadImage = async () => {
    // This is my backend currently provisioned on AWS using CDK
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-image`);
    dispatch(setPixels(res.data.pixels));
  };

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
    ></canvas>
  );
}

export default MainCanvas;