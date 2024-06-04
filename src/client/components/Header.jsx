import { Link } from "react-router-dom";
import styles from "../stylesheets/header.module.css";

const Header = (props) => {
  // Change props.loggedIn to state?
  // Do you even need it?
  return (
    <header>
      <h1>
        <Link to={"/"}>Home</Link>
      </h1>
      {props.loggedIn ? (
        <button>
          <a href="/logout">Logout</a>
        </button>
      ) : (
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
      )}
    </header>
  );
};

export default Header;
