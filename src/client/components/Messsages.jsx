import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/messages.module.css";
import SearchUserModal from "./SearchUserModal";
import FriendRequestsModal from "./FriendRequestsModal";
import FriendsList from "./FriendsList";
import { useEffect, useRef, useState } from "react";

const Messages = () => {
  const [user, setUser, foundUser, setFoundUser] = useOutletContext();
  // Make currentChat latest chat
  const [currentChat, setCurrentChat] = useState(null);
  // Make currentMessages messages with currentChat
  const [currentMessages, setCurrentMessages] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const messagesFetch = await fetch(`/api/message/${user._id}/${currentChat._id}`);
          const res = await messagesFetch.json();
          setCurrentMessages(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

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

  const DisplayMessages = () => {
    if (currentMessages) {
      return (
        <>
          {currentMessages.map((message) => (
            <p key={message._id}>{message.message}</p>
          ))}
        </>
      );
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
          <div className={styles.message}>
            <DisplayMessages />
          </div>
          {currentChat ? (
            <form action="" method="post">
              <label htmlFor="message"></label>
              <input type="text" name="message" className={styles.text} id="message" ref={text} />
              <button onClick={sendMessage}>Send</button>
            </form>
          ) : (
            ""
          )}
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
