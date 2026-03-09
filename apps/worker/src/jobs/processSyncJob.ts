import { fetchDrawingFromPlm } from "../services/plmClient";
import { mapPlmDrawingToDb } from "../services/mappingService";
import { upsertDrawing } from "../services/downstreamStore";

export async function processSyncJob(data: { objectId: string; eventType: string }) {
  const drawing = await fetchDrawingFromPlm(data.objectId);
  const mapped = mapPlmDrawingToDb(drawing);
  await upsertDrawing(mapped);
}