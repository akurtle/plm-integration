export type Role = "admin" | "validator" | "viewer";

export interface AuthUser {
  id: number;
  email: string;
  role: Role;
}