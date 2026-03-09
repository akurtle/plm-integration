import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import { requireRole } from "../../middleware/requireRole";
import { getDrawingController, listDrawingsController } from "./drawings.controller";

const router = Router();
router.use(authMiddleware);
router.get("/", requireRole("admin", "validator", "viewer"), listDrawingsController);
router.get("/:id", requireRole("admin", "validator", "viewer"), getDrawingController);
export default router;