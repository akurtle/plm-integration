import bcrypt from "bcryptjs";

export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}