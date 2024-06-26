import { Link } from "react-router-dom";
import styles from "../stylesheets/header.module.css";

const Header = (props) => {
  const displaySearch = () => {
    props.setFoundUser(null);
    props.searchUser.value = "";
    props.friendRequestModal.style.display = "none";
    if (props.searchModal.style.display === "flex") {
      props.searchModal.style.display = "none";
      props.chatModal.style.display = "flex";
    } else {
      props.searchModal.style.display = "flex";
      props.chatModal.style.display = "none";
    }
  };

  const displayFriendRequests = () => {
    props.searchModal.style.display = "none";
    if (props.friendRequestModal.style.display === "flex") {
      props.friendRequestModal.style.display = "none";
      props.chatModal.style.display = "flex";
    } else {
      props.friendRequestModal.style.display = "flex";
      props.chatModal.style.display = "none";
    }
  };

  return (
    <header>
      <div className={styles.account_links}>
        <div>
          <Link to={`/${props.user.username}/profile/messages`}>Messages</Link>
          <Link>Profile</Link>
        </div>
        <div>
          <button onClick={displaySearch}>Search user</button>
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
