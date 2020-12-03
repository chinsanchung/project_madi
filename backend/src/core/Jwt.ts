import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Log from "@src/utils/logger";
import UserModel from "@src/models/User";

interface tokenProps {
  email: string;
  updatedAt: number;
}

dotenv.config();

export default class JwtService {
  private readonly jwtSecret: string;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }
  createToken(data: { email: string; updatedAt: number }) {
    Log.message("jwtSecret?");
    console.log(this.jwtSecret);
    const accessToken = jwt.sign(data, this.jwtSecret, { expiresIn: "1h" });
    const refreshToken = jwt.sign(data, this.jwtSecret, { expiresIn: "7d" });

    return { accessToken, refreshToken };
  }
  getAccessToken(data: { email: string; updatedAt: number }) {
    const accessToken = jwt.sign(data, this.jwtSecret, { expiresIn: "1h" });
    return accessToken;
  }
  getRefreshToken(data: { email: string; updatedAt: number }) {
    const refreshToken = jwt.sign(data, this.jwtSecret, { expiresIn: "7d" });
    return refreshToken;
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as tokenProps;
      console.log("decoded", decoded);
      if (typeof decoded !== "object") {
        return { success: false, data: "decoded error" };
      } else {
        const user = await UserModel.findOne({
          activate: true,
          email: decoded.email,
          updatedAt: decoded.updatedAt,
        });
        console.log("decoded:", decoded.email, decoded.updatedAt);
        if (user === null) return { success: false, data: "userInfo error" };
        return { success: true, data: decoded };
      }
    } catch (error) {
      Log.errorMessage("validate error");
      Log.errorMessage(error);
      return { success: false, data: "invalid" };
    }
  }
}
