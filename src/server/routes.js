import express from "express";
import post_signup, {
  post_login,
  logout,
  get_profile,
  get_search_profile,
  post_send_friend_request,
  post_remove_friend_request,
  post_accept_friend_request,
  post_remove_friend
} from "./controllers/userController.js";

const router = express.Router();

// Signup form
router.post("/signup", post_signup);

// Login & logout
router.post("/login", post_login);
router.get("/logout", logout);

// If user is not logged in cannot access a user profile
router.post("/:id/profile", post_login);

// Gets user's profile information
router.get("/api/:id/profile/messages", get_profile);

// Searches other user's info for becoming friends
router.get("/api/search/:username", get_search_profile);

// Sends friend requests
router.post("/api/friendrequest/send/:sender/:receiver", post_send_friend_request);

// Removes friend request
router.post("/api/friendrequest/remove/:sender/:receiver", post_remove_friend_request);

// Accept friend request
router.post("/api/friendrequest/accept/:sender/:receiver", post_accept_friend_request);

// Remove friend
router.post("/api/friend/:id/:friend", post_remove_friend);

export default router;
