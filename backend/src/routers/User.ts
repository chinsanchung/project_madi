import { Router } from "express";
import UserController from "@src/controllers/User";

const controller = new UserController();
const router = Router();

router.get("/:id", controller.getOne);
router.post("/duplicate", controller.checkDuplicate);
router.post("/", controller.postJoin);

export default router;
