import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const syncQueue = new Queue("plm-sync", {
  connection: redis
});