import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // ref = model
  friends: [{ type: Schema.Types.ObjectId, ref: "users" }],
  friendRequests: { type: Array }
  // Add profile image
});

export default mongoose.model("users", UserSchema);
