import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { select, update } from "sql-bricks";
import Schema from "validate";

import { getDb } from "../db";
import debug from "debug";
import { v4 as uuid } from "uuid";
import { PoolClient } from "pg";

const loginDebug = debug("pluteum:accesscard:login");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginInputSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: EMAIL_REGEX,
  },
  password: {
    type: String,
    required: true,
  },
  library: {
    type: Number,
    required: false,
  },
});

export default async function loginHandler(req: Request, res: Response) {
  // Validate request
  const { body } = req;

  loginDebug(`Attempting to authenticate ${body.email}`);

  const errors = LoginInputSchema.validate(body);

  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  const { refresh, ...auth } = await loginUser(body);

  res.status(200).cookie("accesscard-refresh", refresh).send(auth);
}

const JWT_KEY = process.env.JWT_KEY || "default";

function generateToken(user: any, library?: any) {
  return jwt.sign({ user, library }, JWT_KEY, { expiresIn: "30m" });
}

async function generateRefreshToken(user: any, pool: PoolClient) {
  const jwtid = uuid();
  const token = jwt.sign({ id: user.id }, JWT_KEY, {
    jwtid,
    expiresIn: "1d",
  });

  const updateQuery = update("users", { refreshToken: jwtid })
    .where({ id: user.id })
    .toParams();

  await pool.query(updateQuery);

  return token;
}

async function loginUser({ email, password, library }: any) {
  const pool = getDb();
  const query = select().from("users").where({ email }).toParams();
  const user = await pool.query(query).then((result) => result.rows[0]);

  if (!user) {
    throw new Error("Unknown user or password");
  }

  loginDebug(`Found user with email ${user.email}`);

  const match = await bcrypt.compare(password, user.password);

  if (match && !library) {
    delete user.password;
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
        refresh: await generateRefreshToken(user, pool),
        user,
        library: result.library,
      };
    }

    loginDebug(
      `Failed to find default library for user with email ${user.email}`
    );

    return {
      token: await generateToken(user),
      refresh: await generateRefreshToken(user, pool),
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
        refresh: await generateRefreshToken(user, pool),
        user,
        library,
      };
    }
  }

  throw new Error("Unknown user or password");
}
