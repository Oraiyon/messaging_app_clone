import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../stylesheets/app.module.css";

function App() {
  return (
    <>
      <h1>Hello World</h1>
      <button>
        <Link to={"/login"} className={styles.link}>
          Login
        </Link>
      </button>
    </>
  );
}

export default App;
