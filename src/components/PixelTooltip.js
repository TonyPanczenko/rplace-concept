import PropTypes from 'prop-types';
import { canvasPxPerImagePx } from 'utils/canvas-config';

import { canvasCoordsToWindowCoords, imageCoordsToCanvasCoords } from 'utils/canvas-helpers';
import styles from '../styles/pixel-tooltip.module.scss';

function PixelTooltip({ pixel, canvasRef }) {
  const {
    coordinates,
    userIp,
    timestamp
  } = pixel;
  const imagePxCanvasCoords = imageCoordsToCanvasCoords(coordinates);
  const rightBottomCornerCoords = {
    x: imagePxCanvasCoords.x + canvasPxPerImagePx,
    y: imagePxCanvasCoords.y + canvasPxPerImagePx
  };
  const windowCoords = canvasCoordsToWindowCoords(rightBottomCornerCoords, canvasRef.current);
  const offsetXPx = 5;
  const offsetYPx = 5;
  const tooltipCoords = {
    x: windowCoords.x + offsetXPx,
    y: windowCoords.y + offsetYPx
  };
  const pixelAddedDate = new Date(timestamp);
  const printableDate = new Intl.DateTimeFormat(navigator.language, {
    month: 'short',
    day: 'numeric'
  }).format(pixelAddedDate);
  const printableTime = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    minute: 'numeric'
  }).format(pixelAddedDate);

  return (
    <div 
      className={styles.tooltip}
      style={{left: `${tooltipCoords.x}px`, top: `${tooltipCoords.y}px`}}
    >
      <p>Placed by [{userIp}] at {printableTime} on {printableDate}</p>
    </div>
  );
}

PixelTooltip.propTypes = {
  pixel: PropTypes.object,
  canvasRef: PropTypes.object
};

export default PixelTooltip;