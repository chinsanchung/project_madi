import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  nickName: string;
  joined: Date;
  updatedAt: number;
}
