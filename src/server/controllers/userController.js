import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find().exec();
  res.json(users);
});

export default getUsers;
