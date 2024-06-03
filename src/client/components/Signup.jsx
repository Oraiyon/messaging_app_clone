import styles from "../stylesheets/signup.module.css";

const SignUp = () => {
  return (
    <form method="post">
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" name="confirmPassword" id="confirmPassword" />
      <button>Sign Up</button>
    </form>
  );
};

export default SignUp;
