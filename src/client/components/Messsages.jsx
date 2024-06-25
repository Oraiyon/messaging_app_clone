import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/messages.module.css";
import SearchUserModal from "./SearchUserModal";
import FriendRequestsModal from "./FriendRequestsModal";
import FriendsList from "./FriendsList";
import { useState } from "react";

const Messages = () => {
  const [user, setUser, foundUser, setFoundUser] = useOutletContext();
  // Make currentChat latest chat
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <div className={styles.container}>
      <FriendsList
        user={user}
        setUser={setUser}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <div className={styles.right_section}>
        <div className={styles.chat}>
          <div className={styles.message}>{currentChat ? currentChat.username : ""}</div>
          <form action="" method="post" className="chat_inputs">
            <label htmlFor="text"></label>
            <input type="text" name="text" className={styles.text} id="text" />
            <button>Send</button>
          </form>
        </div>
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
