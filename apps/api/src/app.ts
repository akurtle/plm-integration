import cors from "cors";
import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import drawingsRoutes from "./modules/drawings/drawings.routes";
import validationRoutes from "./modules/validation/validation.routes";
import webhookRoutes from "./modules/webhooks/webhooks.routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/drawings", drawingsRoutes);
app.use("/validation", validationRoutes);
app.use("/webhooks", webhookRoutes);

app.use(errorHandler);