import express from "express";
import post_signup, { post_login, logout } from "./controllers/userController.js";

const router = express.Router();

router.post("/signup", post_signup);

router.post("/login", post_login);

router.get("/logout", logout);

export default router;
