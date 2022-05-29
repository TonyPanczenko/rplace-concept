import PropTypes from 'prop-types';

import { canvasCoordsToWindowCoords, imageCoordsToCanvasCoords } from 'utils/canvas-helpers';
import styles from '../styles/pixel-tooltip.module.scss';

function PixelTooltip({ pixel, canvasRef }) {
  const {
    coordinates,
    userIp,
    timestamp
  } = pixel;
  const tooltipCoords = canvasCoordsToWindowCoords(imageCoordsToCanvasCoords(coordinates), canvasRef.current);

  return (
    <div 
      className={styles.tooltip}
      style={{left: `${tooltipCoords.x}px`, top: `${tooltipCoords.y}px`}}
    >
      Placed by {userIp} at {timestamp}
    </div>
  );
}

PixelTooltip.propTypes = {
  pixel: PropTypes.object,
  canvasRef: PropTypes.object
};

export default PixelTooltip;