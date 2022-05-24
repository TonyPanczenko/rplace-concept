import CameraCanvas from './CameraCanvas';
import MainCanvas from './MainCanvas';
import AddMenu from './AddMenu';
import styles from '../styles/app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <MainCanvas />
      <CameraCanvas />
      <AddMenu />
    </div>
  );
}

export default App;
