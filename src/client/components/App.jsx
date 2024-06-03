import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  const ListUsers = () => {
    if (users && users.length) {
      return (
        <>
          {users.map((user, index) => (
            <p key={index}>{user.username}</p>
          ))}
        </>
      );
    } else {
      return <p>No users.</p>;
    }
  };

  return <ListUsers />;
}

export default App;
