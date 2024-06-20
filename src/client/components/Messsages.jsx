import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Messages.module.css";
import FindUserModal from "./FindUserModal";
import FriendRequestsModal from "./FriendRequestsModal";

const Messages = () => {
  const [user, searchedUser, setSearchedUser] = useOutletContext();

  return (
    <div className={styles.container}>
      <div className={styles.friends}>
        <div className={styles.friends_list}>
          {user.friends.length ? <h1>HELLO WORLD</h1> : <p>No friends...</p>}
        </div>
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
        <FindUserModal user={user} searchedUser={searchedUser} setSearchedUser={setSearchedUser} />
        <FriendRequestsModal user={user} />
      </div>
    </div>
  );
};

export default Messages;
