import bcrypt from "bcrypt";
import debug from "debug";
import { select } from "sql-bricks";
import { generateToken, generateRefreshToken } from "../token";
import { PoolClient } from "pg";
import { DatabasePoolType, sql } from "slonik";

const loginDebug = debug("pluteum:accesscard:login");

export default async function loginUser(
  { email, password, library }: any,
  pool: DatabasePoolType
) {
  const user: any = await pool.one(
    sql`SELECT * FROM users WHERE email = ${email}`
  );

  if (!user) {
    throw new Error("Unknown user or password");
  }

  loginDebug(`Found user with email ${user.email}`);

  const match = await bcrypt.compare(password, user.password);

  delete user.password;
  delete user.refreshToken;

  if (match && !library) {
    const query = sql`
      SELECT * 
      FROM "users"
      JOIN "users_libraries_link" ON "users.id" = "users_libraries_link.user"
      WHERE "user" = ${user.id} AND "default" = true`;

    const result = await pool.maybeOne(query);

    if (result) {
      loginDebug(
        `Found default library ${result.library} for user with email ${user.email}`
      );
      return {
        token: await generateToken(user, result.library),
        refresh: await generateRefreshToken(user, result.library.toString()),
        user,
        library: result.library,
      };
    }

    loginDebug(
      `Failed to find default library for user with email ${user.email}`
    );

    return {
      token: await generateToken(user),
      refresh: await generateRefreshToken(user, pool, undefined),
      user,
      library: null,
    };
  } else if (match && library) {
    const query = sql`
      SELECT * 
      FROM "users"
      JOIN "users_libraries_link" ON "users.id" = "users_libraries_link.user"
      WHERE "user" = ${user.id} AND "library" = ${library}`;

    const result = await pool.maybeOne(query);

    if (result) {
      return {
        token: await generateToken(user, library),
        refresh: await generateRefreshToken(user, pool, library),
        user,
        library,
      };
    }
  }

  throw new Error("Unknown user or password");
}
