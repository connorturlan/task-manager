import { useState } from "react";
import "./App.css";
import styles from "./App.module.scss";
import CardBoard from "./containers/CardBoard";

function App() {
  return (
    <>
      <div className={styles.Header}>navigation bar</div>
      <div className={styles.Sidebar}>sidebar</div>
      <CardBoard />
    </>
  );
}

export default App;
