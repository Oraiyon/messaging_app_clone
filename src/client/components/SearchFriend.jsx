import styles from "../stylesheets/searchFriend.module.css";

const SearchFriend = (props) => {
  return (
    <form action="" method="post">
      <label htmlFor="friend_search"></label>
      <input type="text" name="friend_search" className={styles.friend_search} id="friend_search" />
    </form>
  );
};

export default SearchFriend;
