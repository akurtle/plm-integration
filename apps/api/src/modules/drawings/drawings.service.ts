import { db } from "../../config/db";

export async function listDrawings() {
  const result = await db.query(
    `SELECT * FROM drawings ORDER BY updated_at DESC`
  );
  return result.rows;
}

export async function getDrawingById(id: number) {
  const result = await db.query(`SELECT * FROM drawings WHERE id = $1`, [id]);
  return result.rows[0] || null;
}