import bcrypt from "bcrypt";
import debug from "debug";
import { Request, Response } from "express";
import { select } from "sql-bricks";
import Schema from "validate";

import { getDb } from "../db";
import { generateToken, generateRefreshToken } from "./token";

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

async function loginUser({ email, password, library }: any) {
  const pool = getDb();
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
        refresh: await generateRefreshToken(user, result.library),
        user,
        library: result.library,
      };
    }

    loginDebug(
      `Failed to find default library for user with email ${user.email}`
    );

    return {
      token: await generateToken(user),
      refresh: await generateRefreshToken(user, undefined),
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
        refresh: await generateRefreshToken(user, library),
        user,
        library,
      };
    }
  }

  throw new Error("Unknown user or password");
}
