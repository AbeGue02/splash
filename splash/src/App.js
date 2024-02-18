import styles from './App.module.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import PostCreator from './components/PostCreator';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <PostCreator />
    </div>
  );
}

export default App;
