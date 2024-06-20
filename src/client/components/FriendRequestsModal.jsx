import styles from "../stylesheets/friendRequestsModal.module.css";

const FriendRequestsModal = (props) => {
  // Change index to _id?
  const removeFriendRequest = async (index) => {
    const fetchUser = await fetch(
      `/api/friendrequest/remove/${props.user.username}/${props.user.friendRequests[index].receiver === props.user.username ? props.user.friendRequests[index].sender : props.user.friendRequests[index].receiver}`,
      { method: "POST" }
    );
    const res = await fetchUser.json();
    props.setUser(res);
  };

  // Separate friend requests for sent or received?
  // Use user._id for key?
  return (
    <div className={styles.friend_request_modal + " friend_requests"}>
      <h3>Friend Requests</h3>
      {props.user.friendRequests.length ? (
        props.user.friendRequests.map((request, index) => (
          <div key={index} className={styles.friend_request}>
            <p>{request.receiver === props.user.username ? request.sender : request.receiver}</p>
            <div>
              {request.receiver === props.user.username ? <button>Accept</button> : ""}
              <button onClick={() => removeFriendRequest(index)}>
                {request.receiver === props.user.username ? "Decline" : "Unsend"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No friend requests...</p>
      )}
    </div>
  );
};

export default FriendRequestsModal;
