import dotenv from "dotenv";
import { Worker } from "bullmq";
import Redis from "ioredis";
import { processSyncJob } from "./jobs/processSyncJob";

dotenv.config();

const connection = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null
});

const worker = new Worker(
  "plm-sync",
  async (job) => {
    await processSyncJob(job.data as { objectId: string; eventType: string });
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});