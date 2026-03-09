import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import { requireRole } from "../../middleware/requireRole";
import { updateValidationController } from "./validation.controller";

const router = Router();
router.use(authMiddleware);
router.patch("/:id", requireRole("admin", "validator"), updateValidationController);
export default router;