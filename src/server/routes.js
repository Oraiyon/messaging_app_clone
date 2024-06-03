import express from "express";
import getUsers from "./controllers/userController.js";

const router = express.Router();

router.get("/api/users", getUsers);

export default router;
