import { Request, Response } from "express";
import Model from "@src/models/SearchWord";
import Log from "@src/utils/logger";

// 참고: https://ip99202.github.io/posts/nodejs,-mongodb-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5/ ㄴ
const searchAndGetWords = async (req: Request, res: Response) => {
  try {
    const { keyword }: { keyword: string } = (req.query as unknown) as {
      keyword: string;
    };
    Log.message("겸색어", keyword);
    const regex = new RegExp(keyword);
    const response = await Model.find({ name: regex }).lean();
    // Log.message("결과", response);

    res.json({ result: response });
  } catch (error) {
    Log.message("검색 에러 발생", error);
    res.status(500).send("검색 에러 발생");
  }
};

export default { searchAndGetWords };
