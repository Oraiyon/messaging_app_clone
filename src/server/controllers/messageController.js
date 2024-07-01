import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const post_send_message = [
  body("message", "Invalid message.").trim().isLength({ min: 1 }).escape(),
  expressAsyncHandler(async (req, res, next) => {
    const sender = await User.findById(req.params.sender).populate("friends").exec();
    const receiver = await User.findById(req.params.receiver).populate("friends").exec();
    const errors = validationResult(req);
    const message = new Message({
      message: req.body.message,
      sender: req.params.sender,
      receiver: req.params.receiver
    });
    if (!errors.isEmpty()) {
      // redirect?
      return;
    }
    // Causes circular reference
    if (sender.friends[0].username !== receiver.username) {
      const newSendersFriends = sender.friends.filter(
        (friend) => friend.username !== receiver.username
      );
      newSendersFriends.unshift(receiver);
      sender.friends = newSendersFriends;
      await sender.save();
    }
    if (receiver.friends[0].username !== sender.username) {
      const newReceiversFriends = receiver.friends.filter(
        (friend) => friend.username !== sender.username
      );
      newReceiversFriends.unshift(sender);
      receiver.friends = newReceiversFriends;
      await receiver.save();
    }
    await message.save();
    // // Sends sender for setUser() & receiver for setCurrentChat()
    // res.json({ sender, receiver });
  })
];

export const get_messages = expressAsyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    $or: [
      { sender: req.params.sender, receiver: req.params.receiver },
      { sender: req.params.receiver, receiver: req.params.sender }
    ]
  })
    .sort({ date_sent: 1 })
    .exec();
  res.json(messages);
});

export default post_send_message;
