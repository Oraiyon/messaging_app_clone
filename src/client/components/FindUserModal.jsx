import { useRef, useState } from "react";
import styles from "../stylesheets/findUserModal.module.css";

const FindUserModal = (props) => {
  const userSearchBar = useRef();

  const getUser = async (e) => {
    e.preventDefault();
    if (props.user.username === userSearchBar.current.value) {
      return;
    }
    const fetchUser = await fetch(`/api/search/${userSearchBar.current.value}`);
    const res = await fetchUser.json();
    props.setSearchedUser(res);
    userSearchBar.current.value = "";
  };

  const sendFriendRequest = async (e) => {
    e.preventDefault();
    // Use ids instead of usernames?
    const fetchFriendRequest = await fetch(
      `/api/friendrequest/send/${props.user.username}/${props.searchedUser.username}`,
      {
        method: "POST"
      }
    );
    const res = await fetchFriendRequest.json();
    props.setUser(res);
  };

  const UserSearchInfo = () => {
    if (props.searchedUser) {
      return (
        <div className={styles.send_request}>
          <p>{props.searchedUser.username}</p>
          <button onClick={sendFriendRequest}>Send Request</button>
        </div>
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
            ref={userSearchBar}
            placeholder="Enter username"
          />
          <button onClick={getUser}>Search</button>
        </div>
        <UserSearchInfo />
      </div>
    </form>
  );
};

export default FindUserModal;
