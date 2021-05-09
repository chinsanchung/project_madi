import mongoose, { Document, Schema } from "mongoose";

interface UserProps extends Document {
  email: string;
  password: string;
  nickName: string;
  joined: Date;
  updatedAt: number;
}

const schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickName: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    updatedAt: { type: Number, default: 0 },
  },
  { collection: "users" }
);

const model = mongoose.model<UserProps>("users", schema);

export default model;
