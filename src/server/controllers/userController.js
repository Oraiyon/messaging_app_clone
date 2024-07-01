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
          res.redirect("/signup");
          return;
        }
        await user.save();
        res.redirect("/login");
      }
    });
  })
];

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
    res.json(req.user);
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
  if (req.user) {
    const user = await User.findById(req.params.id, { password: 0 }).populate("friends").exec();
    res.json(user);
  }
});

export const get_search_profile = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }, { password: 0 }).exec();
  res.json(user);
});

export const post_send_friend_request = expressAsyncHandler(async (req, res, next) => {
  const [sender, receiver] = await Promise.all([
    User.findById(req.params.sender).exec(),
    User.findById(req.params.receiver).exec()
  ]);
  // CHECK FRIENDS FIELD TOO
  for (const request of sender.friendRequests) {
    if (
      request.receiver.username === sender.username ||
      request.receiver.username === receiver.username
    ) {
      return;
    }
  }
  // populate()?
  // Remove username?
  sender.friendRequests = [
    ...sender.friendRequests,
    {
      sender: { username: sender.username, id: sender._id },
      receiver: { username: receiver.username, id: receiver._id }
    }
  ];
  receiver.friendRequests = [
    ...receiver.friendRequests,
    {
      sender: { username: sender.username, id: sender._id },
      receiver: { username: receiver.username, id: receiver._id }
    }
  ];
  await sender.save();
  await receiver.save();
  res.json(sender);
});

export const post_remove_friend_request = expressAsyncHandler(async (req, res, next) => {
  const [sender, receiver] = await Promise.all([
    User.findById(req.params.sender, { password: 0 }).exec(),
    User.findById(req.params.receiver, { password: 0 }).exec()
  ]);
  const newFriendRequestsSender = sender.friendRequests.filter(
    (request) => request.sender.username !== receiver.username
  );
  const newFriendRequestsReceiver = receiver.friendRequests.filter(
    (request) => request.receiver.username !== sender.username
  );
  sender.friendRequests = newFriendRequestsSender;
  receiver.friendRequests = newFriendRequestsReceiver;
  await sender.save();
  await receiver.save();
  res.json(sender);
});

export const post_accept_friend_request = [
  expressAsyncHandler(async (req, res, next) => {
    const [sender, receiver] = await Promise.all([
      User.findById(req.params.sender, { password: 0 }).exec(),
      User.findById(req.params.receiver, { password: 0 }).exec()
    ]);
    const newFriendRequestsSender = sender.friendRequests.filter(
      (request) => request.sender.username !== receiver.username
    );
    const newFriendRequestsReceiver = receiver.friendRequests.filter(
      (request) => request.receiver.username !== sender.username
    );
    sender.friendRequests = newFriendRequestsSender;
    receiver.friendRequests = newFriendRequestsReceiver;
    sender.friends = [...sender.friends, receiver._id];
    receiver.friends = [...receiver.friends, sender._id];
    await sender.save();
    await receiver.save();
    next();
  }),
  expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.sender, { password: 0 }).populate("friends").exec();
    res.json(user);
  })
];

export const post_remove_friend = expressAsyncHandler(async (req, res, next) => {
  const [user, friendUser] = await Promise.all([
    User.findById(req.params.id, { password: 0 }).populate("friends").exec(),
    User.findById(req.params.friend, { password: 0 }).populate("friends").exec()
  ]);
  const newUserFriends = user.friends.filter((friend) => friend.username !== friendUser.username);
  const newFriendUserFriends = friendUser.friends.filter(
    (friend) => friend.username !== user.username
  );
  user.friends = newUserFriends;
  friendUser.friends = newFriendUserFriends;
  await user.save();
  await friendUser.save();
  res.json(user);
});

export default post_signup;
