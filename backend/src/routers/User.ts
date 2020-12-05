import { Router } from "express";
import UserController from "@src/controllers/User";
import AuthController from "@src/controllers/Auth";

const User = new UserController();
const Auth = new AuthController();
const router = Router();

router.get("/my-info", User.getMyInfo);
router.post("/duplicate", User.checkDuplicate);
router.post("/", User.postJoin);

router.get("/:id", User.getOne);

export default router;
