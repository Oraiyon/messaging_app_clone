import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  friends: { type: Array },
  friendRequests: { type: Array }
});

// Create virtual url for redirecting to profile?

export default mongoose.model("users", UserSchema);
