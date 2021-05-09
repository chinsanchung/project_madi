import { Router } from "express";
import controller from "@src/controllers/SearchWord";

const router = Router();

router.get("/", controller.searchAndGetWords);

export default router;
