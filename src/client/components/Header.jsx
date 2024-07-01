import { Link } from "react-router-dom";
import styles from "../stylesheets/header.module.css";

const Header = (props) => {
  const displayModalHelper = (modal) => {
    if (modal.style.display === "flex") {
      modal.style.display = "none";
      props.chatModal.style.display = "flex";
    } else {
      modal.style.display = "flex";
      props.chatModal.style.display = "none";
    }
  };

  const displaySearch = () => {
    props.setFoundUser(null);
    props.searchUser.value = "";
    props.friendRequestModal.style.display = "none";
    displayModalHelper(props.searchModal);
  };

  const displayFriendRequests = () => {
    props.searchModal.style.display = "none";
    displayModalHelper(props.friendRequestModal);
  };

  return (
    <header>
      <div className={styles.account_links}>
        <div>
          <Link to={`/${props.user.username}/profile/messages`}>Messages</Link>
          <Link>Account</Link>
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
