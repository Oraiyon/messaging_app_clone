import { Link } from "react-router-dom";
import Header from "./Header";
import styles from "../stylesheets/signup.module.css";
import { useRef, useState } from "react";

const SignUp = () => {
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const usernameWarning = useRef(null);
  const passwordWarning = useRef(null);
  const confirmPasswordWarning = useRef(null);

  const checkValidUsername = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 3) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
    setUsername(e.target.value);
  };

  const checkValidPassword = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 6) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
    if (
      (!e.target.value && confirmPassword) ||
      (e.target.value !== confirmPassword && confirmPassword)
    ) {
      setValidConfirmPassword(false);
    } else if (!e.target.value || e.target.value === confirmPassword) {
      setValidConfirmPassword(true);
    }
    setPassword(e.target.value);
  };

  const checkValidConfirmPassword = (e) => {
    if (password && e.target.value !== password) {
      setValidConfirmPassword(false);
    } else {
      setValidConfirmPassword(true);
    }
    setConfirmPassword(e.target.value);
  };

  const checkFormInputs = (e) => {
    if (!username || (username.length < 3 && password.length < 6)) {
      e.preventDefault();
      setValidUsername(false);
      setValidPassword(false);
      usernameWarning.current.style.display = "block";
      passwordWarning.current.style.display = "block";
    } else if (!username || username.length < 3) {
      e.preventDefault();
      setValidUsername(false);
      usernameWarning.current.style.display = "block";
    } else if (!password || password.length < 6) {
      e.preventDefault();
      setValidPassword(false);
      passwordWarning.current.style.display = "block";
    }
    if (!password || !confirmPassword || password !== confirmPassword) {
      e.preventDefault();
      setValidConfirmPassword(false);
      confirmPasswordWarning.current.style.display = "block";
    }
  };

  return (
    <>
      <Header />
      <form method="post" className={styles.signup_form} onSubmit={checkFormInputs}>
        <h2>Sign Up</h2>
        <div className={styles.form_container}>
          <fieldset className={validUsername ? "" : styles.invalid_input}>
            <legend className={validUsername ? "" : styles.invalid_input}>Username</legend>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" onChange={checkValidUsername} />
            <p className={styles.username_warning} ref={usernameWarning}>
              Must be atleast 3 characters long
            </p>
          </fieldset>
          <fieldset className={validPassword ? "" : styles.invalid_input}>
            <legend className={validPassword ? "" : styles.invalid_input}>Password</legend>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={checkValidPassword} />
            <p className={styles.password_warning} ref={passwordWarning}>
              Must be atleast 6 characters long
            </p>
          </fieldset>
          <fieldset className={validConfirmPassword ? "" : styles.invalid_input}>
            <legend className={validConfirmPassword ? "" : styles.invalid_input}>
              Confirm Password
            </legend>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={checkValidConfirmPassword}
            />
            <p className={styles.confirm_password_warning} ref={confirmPasswordWarning}>
              Must match your password
            </p>
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
