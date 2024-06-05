import { Link } from "react-router-dom";
import Header from "./Header";
import styles from "../stylesheets/signup.module.css";

const SignUp = () => {
  return (
    <>
      <Header />
      <form method="post" className={styles.signup_form}>
        <div className={styles.form_container}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </div>
        <button>Sign Up</button>
        <p>
          Already have an account? <Link to={"/login"}>Login!</Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
