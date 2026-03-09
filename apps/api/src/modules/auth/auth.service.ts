import { db } from "../../config/db";
import { comparePassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";

export async function login(email: string, password: string) {
  const result = await db.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await comparePassword(password, user.password_hash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  return {
    token: signToken({ id: user.id, email: user.email, role: user.role })
  };
}