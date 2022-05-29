import PropTypes from 'prop-types';

import { imagePxCoordToCanvasCoord } from 'utils/canvas-helpers';
import styles from '../styles/pixel-tooltip.module.scss';

function PixelTooltip({ pixel, canvasRef }) {
  const {
    coordinates,
    userIp,
    timestamp
  } = pixel;
  const canvasBoundingRect = canvasRef.current.getBoundingClientRect();
  const tooltipCoords = {
    x: imagePxCoordToCanvasCoord(coordinates.x) + canvasBoundingRect.left,
    y: imagePxCoordToCanvasCoord(coordinates.y) + canvasBoundingRect.top
  };

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