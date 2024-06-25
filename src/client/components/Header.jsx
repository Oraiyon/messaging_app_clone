import { Link } from "react-router-dom";
import styles from "../stylesheets/header.module.css";

const Header = (props) => {
  // Change props.loggedIn to state?
  // Do you even need it?

  const searchModal = document.querySelector(".search_modal");
  const friendRequestModal = document.querySelector(".friend_requests");
  const searchUser = document.querySelector("#searchUser");

  const modalDisplaySetter = (modal) => {
    if (!modal.style.display || modal.style.display === "none") {
      modal.style.display = "flex";
    } else {
      modal.style.display = "none";
    }
  };

  const displaySearch = () => {
    searchUser.value = "";
    props.setFoundUser(null);
    friendRequestModal.style.display = "none";
    modalDisplaySetter(searchModal);
  };

  const displayFriendRequests = () => {
    searchUser.value = "";
    props.setFoundUser(null);
    searchModal.style.display = "none";
    modalDisplaySetter(friendRequestModal);
  };

  return (
    <header>
      <div className={styles.account_links}>
        <div>
          <Link to={`/${props.user.username}/profile/messages`}>Messages</Link>
          <Link>Profile</Link>
          <Link>Settings</Link>
          <button onClick={displaySearch}>Search user</button>
        </div>
        <div>
          <button onClick={displayFriendRequests}>Friend Requests</button>
          <button>
            <a href="/logout">Logout</a>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
