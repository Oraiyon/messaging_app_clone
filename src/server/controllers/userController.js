import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";

const get_users = expressAsyncHandler(async (req, res) => {
  const users = await User.find().exec();
  res.json(users);
});

export const post_signup = [
  body("username", "Username must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Username must be at least 6 characters long")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      username: req.body.username,
      // encrypt
      password: req.body.password
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.redirect("/form");
      return;
    }
    await user.save();
    res.redirect("/");
  })
];

export default get_users;
