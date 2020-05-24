import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { update } from "sql-bricks";
import { Pool, PoolClient } from "pg";
import { sql, DatabasePoolType } from "slonik";

const JWT_KEY = process.env.JWT_KEY || "default";

export function generateToken(user: any, library?: any) {
  return jwt.sign({ user, library }, JWT_KEY, { expiresIn: "30m" });
}

export function generateMonocleToken(library: any) {
  return jwt.sign({ library }, JWT_KEY, { expiresIn: "24h" });
}

export async function generateResetToken(user_uuid: any) {
  const jwtid = uuid();
  const token = jwt.sign({ uuid: user_uuid }, JWT_KEY, {
    jwtid,
    expiresIn: "30m",
  });

  return { jwtid, token };
}

export function generateRefreshToken(user: any, library?: string) {
  const jwtid = uuid();
  const refreshToken = jwt.sign({ id: user.id, library }, JWT_KEY, {
    jwtid,
    expiresIn: "1d",
  });

  return { jwtid, refreshToken };
}
