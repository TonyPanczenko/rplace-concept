import styles from 'styles/app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.app__link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
