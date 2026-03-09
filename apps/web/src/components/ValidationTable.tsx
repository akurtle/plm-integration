export interface ValidationRow {
  id: number;
  drawing_number: string;
  revision: string;
  title: string;
  lifecycle_state: string;
  validation_status: string;
  validation_errors: string | null;
}

interface Props {
  rows: ValidationRow[];
  onMarkValid: (id: number) => Promise<void>;
}

export default function ValidationTable({ rows, onMarkValid }: Props) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Drawing</th>
          <th>Rev</th>
          <th>Title</th>
          <th>Status</th>
          <th>Errors</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.drawing_number}</td>
            <td>{row.revision}</td>
            <td>{row.title}</td>
            <td>{row.validation_status}</td>
            <td>{row.validation_errors || "-"}</td>
            <td>
              <button onClick={() => onMarkValid(row.id)}>Mark valid</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}