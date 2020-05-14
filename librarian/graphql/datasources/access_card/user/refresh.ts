import debug from "debug";
import { Request, Response } from "express";
import Schema from "validate";
import { verify } from "jsonwebtoken";
import { select } from "sql-bricks";
import { generateRefreshToken, generateToken } from "./token";
import { PoolClient } from "pg";

const refreshDebug = debug("pluteum:accesscard:refresh");
const JWT_KEY = process.env.JWT_KEY || "default";

export default async function refresh(jwt: string, pool: PoolClient) {
  // Validate request
  const token = verify(jwt, JWT_KEY);

  if (token && typeof token === "object") {
    const { id, library, jti } = token as any;

    const query = select(
      "id",
      "uuid",
      "firstName",
      "lastName",
      "email",
      "createdAt"
    )
      .from("users")
      .where({ id, refreshToken: jti })
      .toParams();

    const user = await pool.query(query).then((result) => result.rows[0]);
    const refresh = await generateRefreshToken(user, library);

    return { refresh, token: await generateToken(user, library) };
  }

}
