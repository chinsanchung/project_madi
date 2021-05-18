import { Router } from "express";
import controller from "@src/controllers/Information";

const router = Router();

router.get("/get-list/:name/:page", controller.getListFromKeyword);

export default router;
