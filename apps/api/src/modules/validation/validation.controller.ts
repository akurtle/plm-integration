import { Request, Response } from "express";
import { updateValidation } from "./validation.service";

export async function updateValidationController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { validationStatus, validationErrors } = req.body;
  const updated = await updateValidation(id, validationStatus, validationErrors ?? null);

  if (!updated) {
    return res.status(404).json({ message: "Drawing not found" });
  }

  res.json(updated);
}