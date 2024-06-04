import { Link } from "react-router-dom";
import Header from "./Header";
import styles from "../stylesheets/signup.module.css";

const SignUp = () => {
  return (
    <>
      <Header />
      <form method="post">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button>Sign Up</button>
      </form>
      <div className={styles.login}>
        <p>Already have an account?</p>
        <Link to={"/login"}>Login!</Link>
      </div>
    </>
  );
};

export default SignUp;
