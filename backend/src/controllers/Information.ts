import { Request, Response } from "express";
import Information from "@src/models/Information";
import Ingredients from "@src/models/Ingredients";
import Log from "@src/utils/logger";

interface listParams {
  name: string;
  page: number;
}
const getListFromKeyword = async (req: Request, res: Response) => {
  try {
    const { name, page }: listParams = (req.params as unknown) as listParams;
    const matchQuery = { $match: { name } };
    const getInfo = {
      $lookup: {
        from: "information",
        let: { recipeId: "$recipe_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$recipe_id", "$$recipeId"] } } },
          {
            $project: { title: 1, description: 1, img_url: 1, cooking_time: 1 },
          },
        ],
        as: "information",
      },
    };
    const projectQuery = {
      $project: {
        _id: 0,
        recipe_id: 1,
        title: "$information.title",
        description: "$information.description",
        imgUrl: "$information.img_url",
        cookingTime: "$information.cooking_time",
      },
    };
    const sortQuery = { $sort: { title: 1 } };
    const skipQuery = { $skip: page * 5 };
    const limit = { $limit: 5 };
    const pipeline = [
      matchQuery,
      getInfo,
      { $unwind: "$information" },
      projectQuery,
      sortQuery,
      skipQuery,
      limit,
    ];
    const response = await Ingredients.aggregate(pipeline);
    // Log.message("결과는? ", response);
    res.json({ rows: response });
  } catch (error) {
    Log.message("목록 불러오기 에러 발생", error);
    res.status(500).send("에러가 발생했습니다.");
  }
};

export default {
  getListFromKeyword,
};
