import { useEffect, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [foundUser, setFoundUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // /:id/profile/messages
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
      <Header loggedIn={true} user={user} setFoundUser={setFoundUser} />
      <Outlet context={[user, setUser, foundUser, setFoundUser]} />
    </>
  );
};

export default Profile;
