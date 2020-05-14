import debug from "debug";
import { Request, Response } from "express";
import Schema from "validate";
import jwt from "jsonwebtoken";
import { select } from "sql-bricks";
import { getDb } from "../../../../accesscard/db";
import { generateRefreshToken, generateToken } from "./token";

const refreshDebug = debug("pluteum:accesscard:refresh");
const JWT_KEY = process.env.JWT_KEY || "default";

export default async function refreshHandler(req: Request, res: Response) {
  // Validate request
  const pool = getDb();
  try {
    const token = jwt.verify(req.cookies["accesscard-refresh"], JWT_KEY);

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

      res
        .status(200)
        .cookie("accesscard-refresh", refresh, { httpOnly: true })
        .send({ token: await generateToken(user, library) });
    }
  } catch (e) {
    refreshDebug(e.message);
    res.status(401).send();
  }
}
