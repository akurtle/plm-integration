export function mapPlmDrawingToDb(payload: any) {
  const errors: string[] = [];

  if (!payload.number) errors.push("Missing drawing number");
  if (!payload.revision) errors.push("Missing revision");
  if (!payload.title) errors.push("Missing title");

  return {
    plm_id: payload.id,
    drawing_number: payload.number || "UNKNOWN",
    revision: payload.revision || "UNKNOWN",
    title: payload.title || "Untitled",
    lifecycle_state: payload.lifecycleState || "Unknown",
    owner_name: payload.ownerName || null,
    material_code: payload.materialCode || null,
    validation_status: errors.length ? "warning" : "valid",
    validation_errors: errors.length ? errors.join("; ") : null
  };
}