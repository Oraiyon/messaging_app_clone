import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import UserModel from "../models/userModel.js";

const helloWorld = (req, res) => {
  res.json("Hello World");
};

export default helloWorld;
