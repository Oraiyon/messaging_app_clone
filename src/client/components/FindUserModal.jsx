import styles from "../stylesheets/findUserModal.module.css";

const FindUserModal = (props) => {
  const searchUserProfiles = async (e) => {
    if (!e.target.value) {
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

  const unsendFriendRequest = async (e) => {
    e.preventDefault();
    const fetchUser = await fetch(
      `/api/friendrequest/remove/${props.user._id}/${props.foundUser._id}`,
      { method: "POST" }
    );
    const res = await fetchUser.json();
    props.setUser(res);
  };

  const FriendRequestButton = () => {
    let sent = false;
    for (const request of props.user.friendRequests) {
      if (props.foundUser && request.receiver.username === props.foundUser.username) {
        sent = true;
        break;
      }
    }
    if (sent) {
      // Check if you are sender or receiver
      return (
        <button
          onClick={unsendFriendRequest}
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
        <button
          onClick={sendFriendRequest}
          className={
            props.foundUser && props.foundUser.username
              ? styles.active_friend_button
              : styles.inactive_friend_button
          }
        >
          Add Friend
        </button>
      );
    }
  };

  return (
    <form action="" className={styles.modal_form + " modal"}>
      <div className={styles.modal_info}>
        <div className={styles.modal_inputs}>
          <label htmlFor="findUser"></label>
          <input
            type="text"
            name="findUser"
            id="findUser"
            placeholder="Enter username"
            onChange={searchUserProfiles}
          />
        </div>
        <div className={styles.modal_searched_user}>
          <p>{props.foundUser ? props.foundUser.username : ""}</p>
          <FriendRequestButton />
        </div>
      </div>
    </form>
  );
};

export default FindUserModal;
