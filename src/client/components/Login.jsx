import { Link } from "react-router-dom";
import Header from "./Header";
import styles from "../stylesheets/login.module.css";

const Login = () => {
  return (
    <>
      <Header />
      <form method="post" className={styles.login_form}>
        <div className={styles.form_container}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
        </div>
        <button>Login</button>
        <p>
          Don't have an account yet? <Link to={"/signup"}>Sign Up!</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
