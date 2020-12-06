import { IUser } from "./../../../core/types";
import JwtService from "../../../core/Jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import database from "@src/core/database";
// import UserModel from "./../../../model/User";

const jwtService = new JwtService();

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { email, password },
  } = req;

  try {
    console.log("start postLogin");
    const db = await database();
    const user = ((await db
      .collection("users")
      .findOne({ email })) as unknown) as IUser;

    // console.log("user", user);

    if (!user) {
      res.status(403).send("해당하는 유저가 없습니다.");
    } else if (user.password !== password) {
      res.status(403).send("비밀번호가 일치하지 않습니다.");
    }

    const accessToken = jwtService.getAccessToken({
      _id: user._id,
      updatedAt: user.updatedAt,
    });
    const refreshToken = jwtService.getRefreshToken({
      _id: user._id,
      updatedAt: user.updatedAt,
    });

    res.setHeader(
      "Set-Cookie",
      serialize("rNADACI4MAoJb5C", refreshToken, {
        path: "/",
        maxAge: 604800000,
      }),
    );

    res.send(accessToken);
  } catch (error) {
    console.log("login error", error);
    res.status(403).send("로그인 에러가 발생했습니다.");
  }
};

export default loginHandler;
