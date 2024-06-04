import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const post_signup = [
  body("username", "Username must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Username must be at least 6 characters long")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("confirmPassword", "Confirm password must match your password")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
  expressAsyncHandler(async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        const user = new User({
          username: req.body.username,
          password: hashedPassword
        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          // Find way to send error messages back
          res.redirect("/signup");
          return;
        }
        await user.save();
        res.redirect("/");
      }
    });
  })
];

export default post_signup;
