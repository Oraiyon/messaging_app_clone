import styles from "../stylesheets/searchFriend.module.css";

const SearchFriend = (props) => {
  const findFriend = async (e) => {
    if (e.target.value) {
      for (const friend of props.user.friends) {
        if (friend.username === e.target.value) {
          const fetchUser = await fetch(`/api/search/${e.target.value}`);
          const res = await fetchUser.json();
          props.setCurrentChat(res);
          return;
        } else {
          props.setCurrentChat(props.user.friends[0]);
        }
      }
    } else {
      props.setCurrentChat(props.user.friends[0]);
    }
  };

  return (
    <form action="" method="post">
      <label htmlFor="friend_search"></label>
      <input
        type="text"
        name="friend_search"
        className={styles.friend_search}
        id="friend_search"
        onChange={findFriend}
        placeholder="Find friend"
      />
    </form>
  );
};

export default SearchFriend;
