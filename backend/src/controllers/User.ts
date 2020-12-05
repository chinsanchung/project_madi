import { Request, Response, NextFunction } from "express";
import Log from "@src/utils/logger";
import UserModel from "@src/models/User";
import JwtService from "@src/core/Jwt";

const jwtService = new JwtService();

export default class UserController {
  async getOne(req: Request, res: Response) {
    try {
      Log.message("start getOne");
      console.log("start getOne");
      const { id } = req.params;
      const response = await UserModel.findById(id);

      res.json(response);
      res.end();
    } catch (error) {
      Log.errorMessage(error);
      Log.errorMessage("getOne error");
      res.status(404).send(error);
      res.end();
    }
  }

  async postJoin(req: Request, res: Response) {
    try {
      const user = new UserModel({ ...req.body, updatedAt: Date.now() });
      await user.save();
      Log.message("start postJoin");

      res.status(200).send("success");
      res.end();
    } catch (error) {
      Log.errorMessage("postJoin error");
      Log.errorMessage(error);

      res.status(404).send(error);
      res.end();
    }
  }

  async checkDuplicate(req: Request, res: Response) {
    try {
      const { type, value } = req.body;
      Log.message(`req.body: ${type}, ${value}`);

      const response = await UserModel.findOne({
        [type]: value,
      })
        .select("_id")
        .lean();
      Log.message("검색 결과");
      Log.message(response);

      if (response === null) {
        Log.message("존재하지 않는 회원");
        res.json({ isDuplicate: false });
        res.end();
      } else {
        Log.message("존재하는 회원");
        res.json({ isDuplicate: true });
        res.end();
      }
    } catch (error) {
      Log.errorMessage("중복확인 에러");
      Log.errorMessage(error);
      res.status(403).send("중복확인 에러");
      res.end();
    }
  }

  async getMyInfo(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization;
      const userInfo = jwtService.decodeToken(accessToken);

      const response = await UserModel.findById(userInfo._id);
      // Log.message(response);

      res.json(response);

      res.end();
    } catch (error) {
      Log.errorMessage("getMyInfo error");
      Log.errorMessage(error);
      res.status(403).send("에러가 발생했습니다.");
    }
  }
}
