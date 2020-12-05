import { Types } from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Log from "@src/utils/logger";
import UserModel from "@src/models/User";

interface IToken {
  _id: Types.ObjectId;
  updatedAt: number;
}

dotenv.config();

export default class JwtService {
  private readonly jwtSecret: string;
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

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as IToken;
      // console.log("decoded", decoded);
      Log.message(`start validateToken: ${decoded}`);
      if (typeof decoded !== "object") {
        return { success: false, data: "decoded error" };
      } else {
        const user = await UserModel.findOne({
          _id: decoded._id,
          updatedAt: decoded.updatedAt,
        });
        // console.log("decoded:", decoded.email, decoded.updatedAt);
        if (user === null) return { success: false, data: "userInfo error" };
        if (user.updatedAt !== decoded.updatedAt)
          return { success: false, data: "user updated" };
        return { success: true, data: decoded };
      }
    } catch (error) {
      Log.errorMessage("validate error");
      Log.errorMessage(error);
      return { success: false, data: "invalid" };
    }
  }

  decodeToken(token: string) {
    const decoded = jwt.verify(token, this.jwtSecret) as IToken;

    return decoded;
  }
}
