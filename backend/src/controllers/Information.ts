import { Request, Response } from "express";
import Information from "@src/models/Information";
import Ingredients from "@src/models/Ingredients";
import Log from "@src/utils/logger";

const getListFromKeyword = async (req: Request, res: Response) => {
  try {
    // const response = await Ingredients.aggregate([])
    res.send("success");
  } catch (error) {
    Log.message("목록 불러오기 에러 발생", error);
    res.status(500).send("에러가 발생했습니다.");
  }
};

export default {
  getListFromKeyword,
};
