import { Link } from "react-router-dom";
import styles from "../stylesheets/header.module.css";

const Header = (props) => {
  // Change props.loggedIn to state?
  // Do you even need it?

  const modalDisplaySetter = (modal) => {
    if (!modal.style.display || modal.style.display === "none") {
      modal.style.display = "flex";
    } else {
      modal.style.display = "none";
    }
  };

  const displaySearch = () => {
    props.setSearchedUser(null);
    const searchModal = document.querySelector(".modal");
    const friendRequestModal = document.querySelector(".friend_requests");
    friendRequestModal.style.display = "none";
    modalDisplaySetter(searchModal);
  };

  const displayFriendRequests = () => {
    const searchModal = document.querySelector(".modal");
    const friendRequestModal = document.querySelector(".friend_requests");
    searchModal.style.display = "none";
    modalDisplaySetter(friendRequestModal);
  };

  return (
    <header>
      {props.loggedIn ? (
        <>
          <div className={styles.account_links}>
            <div>
              <Link to={`/${props.user.username}/profile/messages`}>Messages</Link>
              <Link>Profile</Link>
              <Link>Settings</Link>
              <button onClick={displaySearch}>Find user</button>
            </div>
            <div>
              <button onClick={displayFriendRequests}>Friend Requests</button>
              <button>
                <a href="/logout">Logout</a>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.header_buttons}>
          <button>
            <Link to={"/signup"} className={styles.link}>
              Sign Up
            </Link>
          </button>
          <button>
            <Link to={"/login"} className={styles.link}>
              Login
            </Link>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
