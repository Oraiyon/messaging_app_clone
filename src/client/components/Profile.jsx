import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import { Outlet } from "react-router-dom";
import FindUserModal from "./FindUserModal";

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
      <Header loggedIn={true} username={user.username} setSearchedUser={setSearchedUser} />
      <FindUserModal user={user} searchedUser={searchedUser} setSearchedUser={setSearchedUser} />
      <Outlet context={user} />
    </>
  );
};

export default Profile;
