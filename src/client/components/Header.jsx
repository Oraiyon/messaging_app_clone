import { Link } from "react-router-dom";
import styles from "../stylesheets/header.module.css";

const Header = () => {
  return (
    <header>
      <h1>Hello World</h1>
      <div className={styles.header_buttons}>
        <button>
          <Link to={"/signup"} className={styles.link}>
            Sign Up
          </Link>
        </button>
        <button>
          <Link to={"/login"} className={styles.link}>
            Login
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
