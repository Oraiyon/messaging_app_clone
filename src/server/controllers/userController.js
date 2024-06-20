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

// Add loggedIn to User model?
export const post_login = [
  expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      res.json(user);
      return;
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.json(match);
      return;
    }
    next();
  }),
  passport.authenticate("local"),
  (req, res, next) => {
    res.json(true);
  }
];

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export const get_profile = expressAsyncHandler(async (req, res, next) => {
  // if user.loggedIn?
  if (req.user) {
    const user = await User.findOne({ username: req.params.username }, { password: 0 }).exec();
    res.json(user);
  }
});

export const post_sendFriendRequest = expressAsyncHandler(async (req, res, next) => {
  const [sender, receiver] = await Promise.all([
    User.findOne({ username: req.params.sender }).exec(),
    User.findOne({ username: req.params.receiver }).exec()
  ]);
  for (const request of sender.friendRequests) {
    if (request.receiver === receiver.username) {
      return;
    }
  }
  sender.friendRequests = [
    ...sender.friendRequests,
    {
      sender: sender.username,
      receiver: receiver.username
    }
  ];
  receiver.friendRequests = [
    ...receiver.friendRequests,
    {
      sender: sender.username,
      receiver: receiver.username
    }
  ];
  await sender.save();
  await receiver.save();
});

export default post_signup;
