import { Request, Response } from "express";
import { getDrawingById, listDrawings } from "./drawings.service";

export async function listDrawingsController(_req: Request, res: Response) {
  const rows = await listDrawings();
  res.json(rows);
}

export async function getDrawingController(req: Request, res: Response) {
  const row = await getDrawingById(Number(req.params.id));
  if (!row) {
    return res.status(404).json({ message: "Drawing not found" });
  }
  res.json(row);
}