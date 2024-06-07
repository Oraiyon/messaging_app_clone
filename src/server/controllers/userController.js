import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import passport from "passport";

const post_signup = [
  body("username", "Username must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 })
    .toLowerCase()
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
        const errors = validationResult(req);
        const user = new User({
          username: req.body.username,
          password: hashedPassword
        });
        // Checks if username is already taken
        const takenUsername = await User.findOne({ username: user.username }).exec();
        if (!errors.isEmpty() || takenUsername) {
          // Find way to send error messages back
          res.redirect("/signup");
          return;
        }
        await user.save();
        res.redirect("/login");
      }
    });
  })
];

export const post_login = passport.authenticate("local", { failureRedirect: "/login" });

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export const get_profile = expressAsyncHandler(async (req, res, next) => {
  if (req.user) {
    const user = await User.findOne({ username: req.params.username }).exec();
    res.json(user);
  }
});

export const get_check_login_user = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).exec();
  res.json(user);
});

export default post_signup;
