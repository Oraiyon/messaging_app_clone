import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import { Outlet } from "react-router-dom";
import FindUserModal from "./FindUserModal";
import FriendRequestsModal from "./FriendRequestsModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // /:username/profile/messages
        const res = await fetch(`/api${window.location.pathname}`);
        const data = await res.json();
        setUser(data);
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
      <Header loggedIn={true} user={user} setSearchedUser={setSearchedUser} />
      <FindUserModal user={user} searchedUser={searchedUser} setSearchedUser={setSearchedUser} />
      <FriendRequestsModal user={user} />
      <Outlet context={user} />
    </>
  );
};

export default Profile;
