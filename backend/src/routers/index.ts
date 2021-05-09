import { Router } from "express";
import userRouter from "./User";
import authRouter from "./Auth";
import searchRouter from "./SearchWord";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/search", searchRouter);

export default router;
