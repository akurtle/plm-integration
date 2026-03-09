import { db } from "../../config/db";

export async function updateValidation(id: number, validationStatus: string, validationErrors: string | null) {
  const result = await db.query(
    `UPDATE drawings
     SET validation_status = $2,
         validation_errors = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [id, validationStatus, validationErrors]
  );

  return result.rows[0] || null;
}