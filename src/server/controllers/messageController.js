import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const post_send_message = [
  body("message", "Invalid message.").trim().isLength({ min: 1 }).escape(),
  expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.receiver).exec();
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
    await message.save();
    res.json(user);
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
