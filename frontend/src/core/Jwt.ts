import { IUser } from "./types";
import { Schema, Types } from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import database from "./database";

interface IToken {
  _id: string;
  updatedAt: number;
}

dotenv.config();

export default class JwtService {
  private readonly jwtSecret: any;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  getAccessToken(data: IToken) {
    const accessToken = jwt.sign(data, this.jwtSecret, { expiresIn: "1h" });
    return accessToken;
  }

  getRefreshToken(data: IToken) {
    const refreshToken = jwt.sign(data, this.jwtSecret, { expiresIn: "7d" });
    return refreshToken;
  }

  decodeToken(token: string) {
    const decoded = jwt.verify(token, this.jwtSecret) as IToken;
    return decoded;
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as IToken;
      // console.log("decoded", decoded);
      console.log(`start validateToken`);
      console.log("decoded", decoded);
      const _id: string = `${decoded._id}`;

      if (typeof decoded !== "object") {
        return { success: false, data: "decoded error" };
      } else {
        const db = await database();
        const user = ((await db.collection("users").findOne({
          _id: Types.ObjectId(_id),
          updatedAt: decoded.updatedAt,
        })) as unknown) as IUser;
        console.log("user: ", user);
        // console.log("decoded:", decoded._id, decoded.updatedAt);
        if (user === null) return { success: false, data: "userInfo error" };
        if (user.updatedAt !== decoded.updatedAt)
          return { success: false, data: "user updated" };
        return { success: true, data: decoded };
      }
    } catch (error) {
      console.log("validate error");
      console.log(error);
      return { success: false, data: "invalid" };
    }
  }
}
