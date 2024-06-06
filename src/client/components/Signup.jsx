import { Link } from "react-router-dom";
import Header from "./Header";
import styles from "../stylesheets/signup.module.css";
import { useState } from "react";

const SignUp = () => {
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const checkValidUsername = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 3) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
  };

  const checkValidPassword = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 6) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };

  return (
    <>
      <Header />
      <form method="post" className={styles.signup_form}>
        <h2>Sign Up</h2>
        <div className={styles.form_container}>
          <fieldset className={validUsername ? "" : styles.invalid_input}>
            <legend className={validUsername ? "" : styles.invalid_input}>Username</legend>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" onChange={checkValidUsername} />
          </fieldset>
          <fieldset className={validPassword ? "" : styles.invalid_input}>
            <legend className={validPassword ? "" : styles.invalid_input}>Password</legend>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={checkValidPassword} />
          </fieldset>
          <fieldset>
            <legend>Confirm Password</legend>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" />
          </fieldset>
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
