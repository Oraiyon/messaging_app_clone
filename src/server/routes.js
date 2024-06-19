import express from "express";
import post_signup, {
  post_login,
  logout,
  get_profile,
  post_sendFriendRequest
} from "./controllers/userController.js";

const router = express.Router();

// Signup form
router.post("/signup", post_signup);

// Login & logout
router.post("/login", post_login);
router.get("/logout", logout);

// Use ids instead of usernames?
// If user is not logged in cannot access a user profile
router.post("/:username/profile", post_login);

// Gets user's profile information
router.get("/api/:username/profile/messages", get_profile);

// Searches other user's info for becoming friends
router.get("/api/search/:username", get_profile);

// Sends friend requests
router.post("/api/friendrequest/:sender/:receiver", post_sendFriendRequest);

export default router;
