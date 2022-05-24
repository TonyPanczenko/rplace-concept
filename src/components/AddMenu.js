import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { SliderPicker } from 'react-color';

import styles from '../styles/add-menu.module.scss';

function AddMenu() {
  const [color, setColor] = useState('#ffffff');

  return ( 
    <div className={styles.menu}>
      <SliderPicker 
        color={color}
        onChangeComplete={setColor}
      />
      <button>Place pixel</button>
    </div>
  );
}

export default AddMenu;