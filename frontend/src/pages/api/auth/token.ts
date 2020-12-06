import { Types } from "mongoose";
import JwtService from "../../../core/Jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
// import UserModel from "../../../model/User";

const jwtService = new JwtService();

interface IIsValid {
  success: boolean;
  data: {
    _id: Types.ObjectId;
    updatedAt: number;
  };
}

const tokenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST": {
      console.log("start refreshtoken");
      // refresh token
      const refreshToken = req.cookies["rNADACI4MAoJb5C"];
      if (!refreshToken) {
        // 서버는 요청받은 리소스를 찾을 수 없습니다.
        res.status(403).send("토큰이 존재하지 않습니다.");
        res.end();
      }
      const isValid = await jwtService.validateToken(refreshToken);
      console.log(`isValid: ${isValid.success}, ${isValid.data}`);
      const { success, data } = isValid as IIsValid;
      if (success) {
        const accessToken = jwtService.getAccessToken({
          _id: data._id,
          updatedAt: data.updatedAt,
        });
        res.send(accessToken);
      } else {
        // 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다.
        res.status(403).send("토큰이 유효하지 않습니다.");
      }
      break;
    }
    case "DELETE": {
      // https://stackoverflow.com/questions/5285940/correct-way-to-delete-cookies-server-side/5285982#5285982
      res.setHeader(
        "Set-Cookie",
        serialize("rNADACI4MAoJb5C", String("deleted"), {
          path: "/",
          maxAge: 0,
        }),
      );
      res.status(200).send("logout");
      break;
    }
    default: {
      res.status(405).send("Method error");
    }
  }
};

export default tokenHandler;
