import { Link } from "react-router-dom";
import Header from "./Header";
import styles from "../stylesheets/login.module.css";
import { useState, useRef } from "react";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const usernameWarning = useRef(null);
  const passwordWarning = useRef(null);

  // Find way to say if user is not found in database
  const validateLoginInputs = (e) => {
    if (!username || !password) {
      e.preventDefault();
      if (!username && !password) {
        setValidUsername(false);
        setValidPassword(false);
        usernameWarning.current.style.display = "block";
        passwordWarning.current.style.display = "block";
      } else if (!username) {
        setValidUsername(false);
        usernameWarning.current.style.display = "block";
      } else if (!password) {
        setValidPassword(false);
        passwordWarning.current.style.display = "block";
      }
    }
  };

  return (
    <>
      <Header />
      <form method="post" className={styles.login_form} onSubmit={validateLoginInputs}>
        <h2>Login</h2>
        <div className={styles.form_container}>
          <fieldset className={validUsername ? "" : styles.invalid_input}>
            <legend>Username</legend>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className={styles.username_warning} ref={usernameWarning}>
              Invalid username
            </p>
          </fieldset>
          <fieldset className={validPassword ? "" : styles.invalid_input}>
            <legend>Password</legend>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={styles.password_warning} ref={passwordWarning}>
              Invalid password
            </p>
          </fieldset>
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
