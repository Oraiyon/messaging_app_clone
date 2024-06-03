import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";

const get_Users = expressAsyncHandler(async (req, res) => {
  const users = await User.find().exec();
  res.json(users);
});

export default get_Users;
