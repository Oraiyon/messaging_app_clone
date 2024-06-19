import styles from "../stylesheets/friendRequestsModal.module.css";

const FriendRequestsModal = (props) => {
  // Use user._id for key?
  return (
    <div className={styles.friend_request_modal + " friend_requests"}>
      {props.user.friendRequests.map((request, index) => (
        <p key={index}>{request.receiver}</p>
      ))}
    </div>
  );
};

export default FriendRequestsModal;
