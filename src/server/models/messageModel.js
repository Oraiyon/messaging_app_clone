import mongoose, { Schema } from "mongoose";

const messageSchema = Schema({
  message: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "user", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "user", required: true },
  date_sent: { type: Date, default: Date.now }
});

export default mongoose.model("messages", messageSchema);
