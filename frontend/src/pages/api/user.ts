import { Types } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import database from "@src/core/database";

type query = {
  id: string;
};

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "POST": {
      // 회원가입
      console.log("start postJoin");
      const db = await database();
      const user = await db.collection("users").insertOne({
        ...req.body,
        joined: new Date(),
        updatedAt: Date.now(),
      });

      res.status(200).json(user);
      break;
    }
    case "GET": {
      console.log("start postJoin");
      const db = await database();
      const userId: any = id;

      const user = await db
        .collection("users")
        .findOne({ _id: Types.ObjectId(userId) });

      res.json(user);
      break;
    }
    default: {
      res.status(405).send("Method error");
    }
  }
};
