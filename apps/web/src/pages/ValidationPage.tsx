import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import ValidationTable, { ValidationRow } from "../components/ValidationTable";

export default function ValidationPage() {
  const [rows, setRows] = useState<ValidationRow[]>([]);

  async function load() {
    const data = await apiFetch("/drawings");
    setRows(data);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function onMarkValid(id: number) {
    await apiFetch(`/validation/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ validationStatus: "valid", validationErrors: null })
    });
    await load();
  }

  return (
    <div>
      <h2>Validation Queue</h2>
      <ValidationTable rows={rows} onMarkValid={onMarkValid} />
    </div>
  );
}