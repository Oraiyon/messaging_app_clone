import styles from "../stylesheets/friendRequestsModal.module.css";

const FriendRequestsModal = (props) => {
  const removeFriendRequest = (index) => {
    console.log("HI");
  };

  // Separate friend requests for sent or received?
  // Use user._id for key?
  return (
    <div className={styles.friend_request_modal + " friend_requests"}>
      <h3>Friend Requests</h3>
      {props.user.friendRequests.map((request, index) => (
        <div key={index} className={styles.friend_request}>
          <p>{request.receiver === props.user.username ? request.sender : request.receiver}</p>
          <button onClick={() => removeFriendRequest(index)}>
            {request.receiver === props.user.username ? "Decline" : "Remove"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestsModal;
