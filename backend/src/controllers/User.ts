import { Request, Response, NextFunction } from "express";
import Log from "@src/utils/logger";
import UserModel from "@src/models/User";

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
      // console.log("getOne error", error);
      res.status(404).send(error);
      res.end();
    }
  }

  async postJoin(req: Request, res: Response) {
    try {
      const user = new UserModel({ ...req.body, updatedAt: Date.now() });
      await user.save();
      console.log("postjoin", user);

      res.status(200).send("success");
      res.end();
    } catch (error) {
      Log.errorMessage(error);
      // console.log("postJoin error ", error);
      res.status(404).send(error);
      res.end();
    }
  }

  async checkDuplicate(req: Request, res: Response) {
    try {
      const { type, value } = req.body;
      Log.message("req.body");

      const response = await UserModel.findOne({
        [type]: value,
        activate: true,
      })
        .select("_id")
        .lean();
      Log.message("검색 결과");
      Log.message(response);

      if (response === null) {
        Log.message("존재하지 않는 회원");
        res.send("unique");
        res.end();
      } else {
        Log.message("존재하는 회원");
        res.send("duplicate");
        res.end();
      }
    } catch (error) {
      Log.errorMessage("중복확인 에러");
      Log.errorMessage(error);
      res.sendStatus(500);
      res.end();
    }
  }
}
