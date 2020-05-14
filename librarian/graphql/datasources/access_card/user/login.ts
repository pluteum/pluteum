import bcrypt from "bcrypt";
import debug from "debug";
import { select } from "sql-bricks";
import { generateToken, generateRefreshToken } from "./token";
import { PoolClient } from "pg";

const loginDebug = debug("pluteum:accesscard:login");

export default async function loginUser({ email, password, library }: any, pool: PoolClient) {
  const query = select().from("users").where({ email }).toParams();
  const user = await pool.query(query).then((result) => result.rows[0]);

  if (!user) {
    throw new Error("Unknown user or password");
  }

  loginDebug(`Found user with email ${user.email}`);

  const match = await bcrypt.compare(password, user.password);

  delete user.password;
  delete user.refreshToken;

  if (match && !library) {
    const hasLibraryQuery = select()
      .from("users")
      .join("users_libraries_link")
      .on("users.id", "users_libraries_link.user")
      .where({ user: user.id, default: true })
      .toParams();

    const result = await pool
      .query(hasLibraryQuery)
      .then((result) => result.rows[0]);

    if (result) {
      loginDebug(
        `Found default library ${result.library} for user with email ${user.email}`
      );
      return {
        token: await generateToken(user, result.library),
        refresh: await generateRefreshToken(user, pool, result.library),
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
    const hasLibraryQuery = select()
      .from("users")
      .join("users_libraries_link")
      .on("users.id", "users_libraries_link.user")
      .where({ user: user.id, library })
      .toParams();
    const result = await pool
      .query(hasLibraryQuery)
      .then((result) => result.rows[0]);

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
