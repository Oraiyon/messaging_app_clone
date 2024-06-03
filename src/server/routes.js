import express from "express";
import helloWorld from "./controllers/userController.js";

const router = express.Router();

router.get("/", helloWorld);

export default router;
