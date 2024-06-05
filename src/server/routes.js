import express from "express";
import post_signup, { post_login, logout, get_profile } from "./controllers/userController.js";

const router = express.Router();

router.post("/signup", post_signup);

router.post("/login", post_login);
// Change?
router.post("/:username/profile", post_login);

router.get("/logout", logout);

router.get("/api/:username/profile", get_profile);

export default router;
