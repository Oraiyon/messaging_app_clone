import styles from "../stylesheets/findUser.module.css";

const FindUser = (props) => {
  return (
    <form action="" className={styles.modal_form + " modal"}>
      <div className={styles.modal_inputs}>
        <label htmlFor="findUser"></label>
        <input type="text" name="findUser" id="findUser" />
        <button>Search</button>
      </div>
    </form>
  );
};

export default FindUser;
