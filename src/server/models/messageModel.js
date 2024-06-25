import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = Schema({
  message: { type: String, required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  receiver_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  date_sent: { type: Date, default: Date.now }
});

export default mongoose.model("messages", messageSchema);
