import { Link } from "react-router-dom";
import styles from "../stylesheets/header.module.css";

const Header = () => {
  return (
    <header>
      <h1>Hello World</h1>
      <button>
        <Link to={"/login"} className={styles.link}>
          Login
        </Link>
      </button>
    </header>
  );
};

export default Header;
