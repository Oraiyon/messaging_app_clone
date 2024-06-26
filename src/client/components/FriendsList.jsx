import styles from "../stylesheets/friendsList.module.css";
import SearchFriend from "./SearchFriend";

const FriendsList = (props) => {
  const removeFriend = async (friend) => {
    try {
      const fetchUser = await fetch(`/api/friend/${props.user._id}/${friend._id}`, {
        method: "POST"
      });
      const res = await fetchUser.json();
      props.setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  const displayCurrentChat = (friend) => {
    props.searchModal.style.display = "none";
    props.friendRequestModal.style.display = "none";
    props.chatModal.style.display = "flex";
    props.setCurrentChat(friend);
  };

  return (
    <div className={styles.friends}>
      <div className={styles.friends_list}>
        {props.user.friends.map((friend) => (
          <div
            key={friend._id}
            className={
              props.currentChat && props.currentChat._id === friend._id
                ? styles.friend + " " + styles.current_chat
                : styles.friend
            }
            onClick={() => displayCurrentChat(friend)}
          >
            <p>{friend.username}</p>
            <button onClick={() => removeFriend(friend)}>Remove Friend</button>
          </div>
        ))}
      </div>
      <SearchFriend user={props.user} setCurrentChat={props.setCurrentChat} />
    </div>
  );
};

export default FriendsList;
