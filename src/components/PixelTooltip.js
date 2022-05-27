import PropTypes from 'prop-types';

import styles from '../styles/pixel-tooltip.module.scss';

function PixelTooltip(props) {

  return (
    <div style={props.style} className={styles.tooltip}>
      asdasdasdasd
    </div>
  );
}

PixelTooltip.propTypes = {
  style: PropTypes.object,
  pixel: PropTypes.object
};

export default PixelTooltip;