import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SliderPicker } from 'react-color';
import axios from 'axios';

import { addPixel } from 'store/canvas';
import { imageResX } from 'utils/canvas-config';
import styles from '../styles/add-menu.module.scss';

function AddMenu() {
  const dispatch = useDispatch();
  const selectedPxId = useSelector((state) => state.canvas.selectedPixelId);
  const [color, setColor] = useState('#ffffff');
  const placePixel = async () => {
    const coordinates = {
      x: Math.floor(selectedPxId % imageResX),
      y: Math.floor(selectedPxId / imageResX)
    };
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/add-pixel`, {
      coordinates,
      color
    });
    if(res.status === 200) {
      dispatch(addPixel({
        pixel: {
          coordinates,
          color
        },
        timestamp: 0,
      }));
    }
  };

  return ( 
    <div className={styles.menu}>
      <SliderPicker
        className={styles.picker} 
        color={color}
        onChangeComplete={(payload) => setColor(payload.hex)}
      />
      <button 
        className={styles.btn}
        onClick={placePixel}
      >
        Place pixel
      </button>
    </div>
  );
}

export default AddMenu;