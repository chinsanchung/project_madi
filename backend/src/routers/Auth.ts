import { Router } from "express";
import Controller from "@src/controllers/Auth";

const router = Router();
const controller = new Controller();

router.post("/login", controller.postLogin);
router.get("/valid", controller.validateToken);
router.post("/refresh", controller.silentRefresh);
router.delete("/token", controller.logout);

export default router;
