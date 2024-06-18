import { useRef, useState } from "react";
import styles from "../stylesheets/findUser.module.css";

const FindUser = (props) => {
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
        {props.searchedUser ? <p>{props.searchedUser.username}</p> : ""}
      </div>
    </form>
  );
};

export default FindUser;
