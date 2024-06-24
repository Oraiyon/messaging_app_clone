import styles from "../stylesheets/friendsList.module.css";

const FriendsList = (props) => {
  return (
    <div className={styles.friends_list}>
      {props.user.friends.map((friend) => (
        <p key={friend._id + friend.username}>{friend.username}</p>
      ))}
    </div>
  );
};

export default FriendsList;
