import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Messages.module.css";

const Messages = () => {
  const user = useOutletContext();

  return (
    <div className={styles.container}>
      <div className={styles.friends}>
        <div className={styles.friends_list}>
          {user.friends.length ? <h1>HELLO WORLD</h1> : <p>No friends...</p>}
        </div>
        <label htmlFor="friend_search"></label>
        <input
          type="text"
          name="friend_search"
          className={styles.friend_search}
          id="friend_search"
        />
      </div>

      <div className={styles.messages}>
        <form action="" method="post">
          <label htmlFor="message"></label>
          <input type="text" name="message" className={styles.message} id="message" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
