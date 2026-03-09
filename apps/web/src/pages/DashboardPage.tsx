import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function DashboardPage() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    apiFetch("/drawings").then((rows) => setCount(rows.length)).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total synced drawing records: {count}</p>
    </div>
  );
}