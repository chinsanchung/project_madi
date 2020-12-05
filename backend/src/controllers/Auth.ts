import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import UserModel from "@src/models/User";
import Log from "@src/utils/logger";
import JwtService from "@src/core/Jwt";
import { tokenSet } from "./../constants/index";

const jwtService = new JwtService();

interface IIsValid {
  success: boolean;
  data: {
    _id: Types.ObjectId;
    updatedAt: number;
  };
}

export default class AuthController {
  async postLogin(req: Request, res: Response, next: NextFunction) {
    Log.message(req.body);
    try {
      const user: any = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        res.status(403).send("해당하는 유저가 없습니다.");
        res.end();
      } else if (user.password !== req.body.password) {
        res.status(403).send("비밀번호가 일치하지 않습니다.");
        res.end();
      }
      const accessToken = jwtService.getAccessToken({
        _id: user._id,
        updatedAt: user.updatedAt,
      });
      const refreshToken = jwtService.getRefreshToken({
        _id: user._id,
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
      res.status(403).send("토큰이 존재하지 않습니다.");
      res.end();
    }
    const isValid = await jwtService.validateToken(accessToken);
    const { success, data } = isValid as IIsValid;
    Log.message(`isValid: ${isValid.success}, ${isValid.data}`);
    if (success) {
      const accessToken = jwtService.getAccessToken({
        _id: data._id,
        updatedAt: data.updatedAt,
      });

      res.send(accessToken);
      res.end();
    } else {
      // 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다.
      res.status(403).send("토큰이 유효하지 않습니다.");
      res.end();
    }
  }

  async silentRefresh(req: Request, res: Response) {
    const refreshToken = req.cookies[tokenSet.refreshTokenName];
    if (!refreshToken) {
      // 서버는 요청받은 리소스를 찾을 수 없습니다.
      res.status(403).send("토큰이 존재하지 않습니다.");
      res.end();
    }
    const isValid = await jwtService.validateToken(refreshToken);
    Log.message(`isValid: ${isValid.success}, ${isValid.data}`);
    const { success, data } = isValid as IIsValid;
    if (success) {
      const accessToken = jwtService.getAccessToken({
        _id: data._id,
        updatedAt: data.updatedAt,
      });
      res.send(accessToken);
      res.end();
    } else {
      // 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다.
      res.status(403).send("토큰이 유효하지 않습니다.");
      res.end();
    }
  }

  logout(req: Request, res: Response) {
    Log.message("start Logout");
    res.clearCookie(tokenSet.refreshTokenName);
    res.send("success");
    res.end();
  }

  decodeToken(req: Request, res: Response, next: NextFunction) {
    Log.message("start decodeToken");
    const accessToken = req.headers.authorization;
    Log.message(accessToken);
    const decoded = jwtService.decodeToken(accessToken);

    req.adminToken = decoded;

    next();
  }
}
