import { Router } from "express";
import { plmWebhookController } from "./webhooks.controller";

const router = Router();
router.post("/plm", plmWebhookController);
export default router;