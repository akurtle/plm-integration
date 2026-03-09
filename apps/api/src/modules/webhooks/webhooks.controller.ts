import { Request, Response } from "express";
import { db } from "../../config/db";
import { syncQueue } from "../../queue/syncQueue";
import { env } from "../../config/env";

export async function plmWebhookController(req: Request, res: Response) {
  const signature = req.headers["x-webhook-secret"];

  if (signature !== env.webhookSharedSecret) {
    return res.status(401).json({ message: "Invalid webhook secret" });
  }

  const { eventType, objectId } = req.body;

  await db.query(
    `INSERT INTO webhook_events (event_type, plm_object_id, payload)
     VALUES ($1, $2, $3)`,
    [eventType, objectId, JSON.stringify(req.body)]
  );

  await syncQueue.add("sync-drawing", {
    objectId,
    eventType
  });

  res.status(202).json({ message: "Webhook accepted" });
}