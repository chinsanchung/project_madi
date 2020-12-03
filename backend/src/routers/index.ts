import { Router } from "express";
import userRouter from "./User";
import authRouter from "./Auth";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
