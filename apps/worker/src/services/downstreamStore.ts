import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function upsertDrawing(record: any) {
  await db.query(
    `INSERT INTO drawings (
      plm_id, drawing_number, revision, title, lifecycle_state,
      owner_name, material_code, validation_status, validation_errors, last_synced_at, updated_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
    ON CONFLICT (plm_id)
    DO UPDATE SET
      drawing_number = EXCLUDED.drawing_number,
      revision = EXCLUDED.revision,
      title = EXCLUDED.title,
      lifecycle_state = EXCLUDED.lifecycle_state,
      owner_name = EXCLUDED.owner_name,
      material_code = EXCLUDED.material_code,
      validation_status = EXCLUDED.validation_status,
      validation_errors = EXCLUDED.validation_errors,
      last_synced_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP`,
    [
      record.plm_id,
      record.drawing_number,
      record.revision,
      record.title,
      record.lifecycle_state,
      record.owner_name,
      record.material_code,
      record.validation_status,
      record.validation_errors
    ]
  );
}