import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/messages.module.css";
import SearchUserModal from "./SearchUserModal";
import FriendRequestsModal from "./FriendRequestsModal";
import FriendsList from "./FriendsList";
import { useRef, useState } from "react";

const Messages = () => {
  const [user, setUser, foundUser, setFoundUser] = useOutletContext();
  // Make currentChat latest chat
  const [currentChat, setCurrentChat] = useState(null);
  // Make currentMessages messages with currentChat
  const [currentMessages, setCurrentMessages] = useState(null);

  const text = useRef(null);

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      if (!text.current.value.length) {
        return;
      }
      await fetch(`/api/message/${user._id}/${currentChat._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.current.value })
      });
      text.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const messagesFetch = await fetch(`/api/message/${user._id}/${currentChat._id}`);
      const res = await messagesFetch.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className={styles.message} onClick={getMessages}>
            {currentChat ? currentChat.username : ""}
          </div>
          <form action="" method="post" className="chat_inputs">
            <label htmlFor="message"></label>
            <input type="text" name="message" className={styles.text} id="message" ref={text} />
            <button onClick={sendMessage}>Send</button>
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
