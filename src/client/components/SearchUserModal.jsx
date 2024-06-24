import styles from "../stylesheets/searchUserModal.module.css";

const SearchUserModal = (props) => {
  const searchUserProfiles = async (e) => {
    if (!e.target.value || e.target.value === props.user.username) {
      props.setFoundUser(null);
      return;
    }
    const searchUser = await fetch(`/api/search/${e.target.value}`);
    const res = await searchUser.json();
    if (res) {
      props.setFoundUser(res);
    } else {
      props.setFoundUser(null);
    }
  };

  const sendFriendRequest = async (e) => {
    e.preventDefault();
    const fetchFriendRequest = await fetch(
      `/api/friendrequest/send/${props.user._id}/${props.foundUser._id}`,
      {
        method: "POST"
      }
    );
    const res = await fetchFriendRequest.json();
    props.setUser(res);
  };

  const removeFriendRequest = async (e) => {
    e.preventDefault();
    const fetchUser = await fetch(
      `/api/friendrequest/remove/${props.user._id}/${props.foundUser._id}`,
      { method: "POST" }
    );
    const res = await fetchUser.json();
    props.setUser(res);
  };

  const acceptFriendRequest = async (e) => {
    e.preventDefault();
    const fetchUser = await fetch(
      `/api/friendrequest/accept/${props.user._id}/${props.foundUser._id}`,
      { method: "POST" }
    );
    const res = await fetchUser.json();
    props.setUser(res);
  };

  const removeFriend = async (e, friend) => {
    e.preventDefault();
    const fetchUser = await fetch(`/api/friend/${props.user._id}/${friend._id}`, {
      method: "POST"
    });
    const res = await fetchUser.json();
    props.setUser(res);
  };

  const FriendRequestButton = () => {
    let sent = false;
    let friendReq;
    for (const friend of props.user.friends) {
      if (props.foundUser && props.foundUser._id === friend._id) {
        return <button onClick={(e) => removeFriend(e, friend)}>Remove Friend</button>;
      }
    }
    for (const request of props.user.friendRequests) {
      if (
        (props.foundUser && request.sender.username === props.foundUser.username) ||
        (props.foundUser && request.receiver.username === props.foundUser.username)
      ) {
        friendReq = request;
        sent = true;
        break;
      }
    }
    if (sent) {
      if (props.user._id === friendReq.sender.id) {
        return (
          <button
            onClick={removeFriendRequest}
            className={
              props.foundUser && props.foundUser.username
                ? styles.active_friend_button
                : styles.inactive_friend_button
            }
          >
            Unsend Request
          </button>
        );
      } else {
        return (
          <div>
            <button
              onClick={acceptFriendRequest}
              className={
                props.foundUser && props.foundUser.username
                  ? styles.active_friend_button
                  : styles.inactive_friend_button
              }
            >
              Accept Request
            </button>
            <button
              onClick={removeFriendRequest}
              className={
                props.foundUser && props.foundUser.username
                  ? styles.active_friend_button
                  : styles.inactive_friend_button
              }
            >
              Decline Request
            </button>
          </div>
        );
      }
    } else {
      return (
        <button
          onClick={sendFriendRequest}
          className={
            props.foundUser && props.foundUser.username
              ? styles.active_friend_button
              : styles.inactive_friend_button
          }
        >
          Send Friend Request
        </button>
      );
    }
  };

  return (
    <form action="" className={styles.modal_form + " modal"}>
      <h3>Search User</h3>
      <label htmlFor="searchUser"></label>
      <input
        type="text"
        name="searchUser"
        id="searchUser"
        placeholder="Enter username"
        onChange={searchUserProfiles}
      />
      <div className={styles.modal_searched_user}>
        <p>{props.foundUser ? props.foundUser.username : ""}</p>
        <FriendRequestButton />
      </div>
    </form>
  );
};

export default SearchUserModal;
