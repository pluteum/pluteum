import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { update } from "sql-bricks";
import { Pool, PoolClient } from "pg";

const JWT_KEY = process.env.JWT_KEY || "default";

export function generateToken(user: any, library?: any) {
  return jwt.sign({ user, library }, JWT_KEY, { expiresIn: "30m" });
}

export function generateMonocleToken(library: any) {
  return jwt.sign({ library }, JWT_KEY, { expiresIn: "24h" });
}

export async function generateResetToken(user_uuid: any, pool: PoolClient) {
  const jwtid = uuid();
  const token = jwt.sign({ uuid: user_uuid }, JWT_KEY, {
    jwtid,
    expiresIn: "30m",
  });

  const updateQuery = update("users", { resetToken: jwtid })
    .where({ uuid: user_uuid })
    .toParams();

  await pool.query(updateQuery);

  return token;
}

export async function generateRefreshToken(
  user: any,
  pool: PoolClient,
  library?: Number
) {
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
