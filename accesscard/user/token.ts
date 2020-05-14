import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { update } from "sql-bricks";
import { getDb } from "../db";

const JWT_KEY = process.env.JWT_KEY || "default";

export function generateToken(user: any, library?: any) {
  return jwt.sign({ user, library }, JWT_KEY, { expiresIn: "30m" });
}

export async function generateRefreshToken(user: any, library?: Number) {
  const pool = getDb();
  const jwtid = uuid();
  const token = jwt.sign({ id: user.id, library }, JWT_KEY, {
    jwtid,
    expiresIn: "1d",
  });

  const updateQuery = update("users", { refreshToken: jwtid })
    .where({ id: user.id })
    .toParams();

  await pool.query(updateQuery);

  return token;
}
