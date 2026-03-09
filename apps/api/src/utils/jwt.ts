import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthUser } from "../types/auth";

export function signToken(user: AuthUser) {
  return jwt.sign(user, env.jwtSecret, { expiresIn: "1d" });
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, env.jwtSecret) as AuthUser;
}