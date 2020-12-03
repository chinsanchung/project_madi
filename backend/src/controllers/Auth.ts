import UserModel from "@src/models/User";
import { Request, Response, NextFunction } from "express";
import Log from "@src/utils/logger";
import JwtService from "@src/core/Jwt";
import { tokenSet } from "./../constants/index";

const jwtService = new JwtService();

interface isValidProp {
  success: boolean;
  data: {
    email: string;
    updatedAt: number;
  };
}

export default class AuthController {
  async postLogin(req: Request, res: Response, next: NextFunction) {
    Log.message(req.body);
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        res.sendStatus(404);
        res.end();
      } else if (user.password !== req.body.password) {
        res.sendStatus(403);
        res.end();
      }
      const accessToken = jwtService.getAccessToken({
        email: user.email,
        updatedAt: user.updatedAt,
      });
      const refreshToken = jwtService.getRefreshToken({
        email: user.email,
        updatedAt: user.updatedAt,
      });

      res.cookie(tokenSet.refreshTokenName, refreshToken, {
        maxAge: tokenSet.refreshMaxAge,
      });
      res.send(accessToken);
      res.end();
    } catch (error) {
      console.log("login error", error);
      res.sendStatus(500);
      res.end();
    }
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    Log.message("start validateToken");
    const accessToken = req.headers.authorization;
    const refreshToken = req.cookies[tokenSet.refreshTokenName];

    if (!accessToken || !refreshToken) {
      // 서버는 요청받은 리소스를 찾을 수 없습니다.
      res.sendStatus(404);
      res.end();
    }
    const isValid = await jwtService.validateToken(accessToken);
    const { success, data } = isValid as isValidProp;
    Log.message(`isValid: ${isValid.success}, ${isValid.data}`);
    if (success) {
      const accessToken = jwtService.getAccessToken({
        email: data.email,
        updatedAt: data.updatedAt,
      });

      res.send(accessToken);
      res.end();
    } else {
      // 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다.
      res.sendStatus(403);
      res.end();
    }
  }

  async silentRefresh(req: Request, res: Response) {
    const refreshToken = req.cookies[tokenSet.refreshTokenName];
    if (!refreshToken) {
      // 서버는 요청받은 리소스를 찾을 수 없습니다.
      res.sendStatus(404);
      res.end();
    }
    const isValid = await jwtService.validateToken(refreshToken);
    Log.message(`isValid: ${isValid.success}, ${isValid.data}`);
    const { success, data } = isValid as isValidProp;
    if (success) {
      const accessToken = jwtService.getAccessToken({
        email: data.email,
        updatedAt: data.updatedAt,
      });
      res.send(accessToken);
      res.end();
    } else {
      // 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다.
      res.sendStatus(403);
      res.end();
    }
  }

  logout(req: Request, res: Response) {
    Log.message("start Logout");
    res.clearCookie(tokenSet.refreshTokenName);
    res.send("success");
    res.end();
  }
}
