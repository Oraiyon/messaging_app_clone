import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Messages.module.css";
import SearchUserModal from "./SearchUserModal";
import FriendRequestsModal from "./FriendRequestsModal";
import FriendsList from "./FriendsList";

const Messages = () => {
  const [user, setUser, foundUser, setFoundUser] = useOutletContext();

  // Make right side own component?
  return (
    <div className={styles.container}>
      <div className={styles.friends}>
        <FriendsList user={user} setUser={setUser} />
        <form action="" method="post">
          <label htmlFor="friend_search"></label>
          <input
            type="text"
            name="friend_search"
            className={styles.friend_search}
            id="friend_search"
          />
        </form>
      </div>

      <div className={styles.chat}>
        <form action="" method="post" className="chat_inputs">
          <label htmlFor="text"></label>
          <input type="text" name="text" className={styles.text} id="text" />
          <button>Send</button>
        </form>
        <SearchUserModal
          user={user}
          setUser={setUser}
          foundUser={foundUser}
          setFoundUser={setFoundUser}
        />
        <FriendRequestsModal user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default Messages;
