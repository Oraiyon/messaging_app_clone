import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  messages: { type: Array }
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
