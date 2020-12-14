import { Types } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  nickName: string;
  joined: Date;
  updatedAt: number;
}
