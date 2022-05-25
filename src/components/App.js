import { useSelector } from 'react-redux';

import CameraCanvas from './CameraCanvas';
import MainCanvas from './MainCanvas';
import AddMenu from './AddMenu';
import styles from '../styles/app.module.scss';

function App() {
  const selectedPxId = useSelector((state) => state.canvas.selectedPixelId);

  return (
    <div className={styles.app}>
      <MainCanvas />
      <CameraCanvas />
      {selectedPxId !== undefined && 
        <AddMenu />
      }
    </div>
  );
}

export default App;
