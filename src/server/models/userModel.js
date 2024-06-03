import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  messages: { type: Array }
});

const User = mongoose.model("users", UserSchema);

export default User;
