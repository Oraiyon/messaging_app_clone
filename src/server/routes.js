import express from "express";
import post_signup, {
  post_login,
  logout,
  get_profile,
  get_check_login_user
} from "./controllers/userController.js";

const router = express.Router();

// Signup form
router.post("/signup", post_signup);

// Login & logout
router.post("/login", post_login);
router.get("/logout", logout);

// Change? If user is not logged in
router.post("/:username/profile", post_login);

// Checks if user is in database during login
router.get("/api/login/:username", get_check_login_user);

// Gets user's profile information
router.get("/api/:username/profile", get_profile);

export default router;
