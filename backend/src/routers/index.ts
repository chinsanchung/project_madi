import { Router } from "express";
import userRouter from "./User";
import authRouter from "./Auth";
import searchRouter from "./SearchWord";
import information from "./Information";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/search", searchRouter);
router.use("/information", information);

export default router;
