import CameraCanvas from './CameraCanvas';
import MainCanvas from './MainCanvas';
import styles from '../styles/app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <MainCanvas />
      <CameraCanvas />
    </div>
  );
}

export default App;
