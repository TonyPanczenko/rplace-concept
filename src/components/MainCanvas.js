import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
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

  useEffect(() => {
    initCanvas();
    getImage();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = imageResX * canvasPxPerImagePx + 4 * cameraLineWidth * canvasPxDensity;
    canvas.height = imageResY * canvasPxPerImagePx + 4 * cameraLineWidth * canvasPxDensity;
    const ctx = canvas.getContext('2d');
    ctx.scale(canvasPxDensity, canvasPxDensity);
    ctxRef.current = ctx; 
  };

  const getImage = async () => {
    // This is my backend currently provisioned on AWS using CDK
    const { data: { pixels } } = await axios.get(`${process.env.REACT_APP_API_URL}/get-image`);
    pixels.forEach(({ Coordinates, Color }) => {
      ctxRef.current.fillStyle = Color;
      ctxRef.current.fillRect(
        Coordinates.x * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
        Coordinates.y * canvasPxPerImagePx + 2 * cameraLineWidth * canvasPxDensity,
        canvasPxPerImagePx,
        canvasPxPerImagePx
      );
    });
    dispatch(setPixels(pixels));
  };

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
    ></canvas>
  );
}

export default MainCanvas;