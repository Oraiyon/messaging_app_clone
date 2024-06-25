import { Link } from "react-router-dom";
import styles from "../stylesheets/header.module.css";

const Header = (props) => {
  // Change props.loggedIn to state?
  // Do you even need it?

  // Second modal open conflicting
  const modalDisplaySetter = (modal) => {
    props.setFoundUser(null);
    if (!modal.style.display || modal.style.display === "none") {
      props.chatModal.style.display = "none";
      modal.style.display = "flex";
    } else {
      props.chatModal.style.display = "flex";
      modal.style.display = "none";
    }
    props.searchUser.value = "";
  };

  const displaySearch = () => {
    props.friendRequestModal.style.display = "none";
    modalDisplaySetter(props.searchModal);
  };

  const displayFriendRequests = () => {
    props.searchModal.style.display = "none";
    modalDisplaySetter(props.friendRequestModal);
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
