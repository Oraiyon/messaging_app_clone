import styles from "../stylesheets/friendsList.module.css";

const FriendsList = (props) => {
  const removeFriend = async (friend) => {
    const fetchUser = await fetch(`/api/friend/${props.user._id}/${friend._id}`, {
      method: "POST"
    });
    const res = await fetchUser.json();
    props.setUser(res);
  };

  return (
    <div className={styles.friends}>
      <div className={styles.friends_list}>
        {props.user.friends.map((friend) => (
          <div key={friend._id + friend.username} className={styles.friend}>
            <p>{friend.username}</p>
            <button onClick={() => removeFriend(friend)}>Remove Friend</button>
          </div>
        ))}
      </div>
      <form action="" method="post">
        <label htmlFor="friend_search"></label>
        <input
          type="text"
          name="friend_search"
          className={styles.friend_search}
          id="friend_search"
        />
      </form>
    </div>
  );
};

export default FriendsList;
