import { useEffect, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [foundUser, setFoundUser] = useState(null);
  // Make currentChat latest chat
  const [currentChat, setCurrentChat] = useState(null);
  // Make currentMessages messages with currentChat
  const [currentMessages, setCurrentMessages] = useState(null);

  // Change to useRef()?
  const searchModal = document.querySelector(".search_modal");
  const friendRequestModal = document.querySelector(".friend_requests");
  const searchUser = document.querySelector("#searchUser");
  const chatModal = document.querySelector(".chat_modal");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // /:id/profile/messages
        const fetchUser = await fetch(`/api${window.location.pathname}`);
        const data = await fetchUser.json();
        setUser(data);
        if (data.friends.length) {
          setCurrentChat(data.friends[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Header
        loggedIn={true}
        user={user}
        setFoundUser={setFoundUser}
        searchUser={searchUser}
        friendRequestModal={friendRequestModal}
        searchModal={searchModal}
        chatModal={chatModal}
      />
      <Outlet
        context={[
          user,
          setUser,
          foundUser,
          setFoundUser,
          currentChat,
          setCurrentChat,
          currentMessages,
          setCurrentMessages,
          searchModal,
          friendRequestModal,
          chatModal
        ]}
      />
    </>
  );
};

export default Profile;
