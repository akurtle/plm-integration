export interface DrawingRecord {
  id: number;
  plm_id: string;
  drawing_number: string;
  revision: string;
  title: string;
  lifecycle_state: string;
  owner_name: string | null;
  material_code: string | null;
  validation_status: "pending" | "valid" | "warning" | "invalid";
  validation_errors: string | null;
  last_synced_at: string | null;
}