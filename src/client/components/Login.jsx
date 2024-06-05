import { Link } from "react-router-dom";
import Header from "./Header";
import styles from "../stylesheets/login.module.css";

const Login = () => {
  return (
    <>
      <Header />
      <form method="post">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <button>Login</button>
      </form>
      <p>
        Don't have an account yet? <Link to={"/signup"}>Sign Up!</Link>
      </p>
    </>
  );
};

export default Login;
