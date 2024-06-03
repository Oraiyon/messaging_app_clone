import express from "express";
import get_Users from "./controllers/userController.js";

const router = express.Router();

router.get("/api/users", get_Users);

export default router;
