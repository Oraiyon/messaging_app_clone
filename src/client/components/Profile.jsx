import { useEffect, useState } from "react";
import Header from "./Header";
import Login from "./Login";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
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
      <Header loggedIn={true} />
      <p>{user.username}</p>
    </>
  );
};

export default Profile;
