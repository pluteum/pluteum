import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { select } from "sql-bricks";
import Schema from "validate";

import { getDb } from "../db";
import debug from "debug";

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
});

export default async function loginHandler(req: Request, res: Response) {
  // Validate request
  const { body } = req;

  loginDebug(`Attempting to authenticate ${body.email}`);

  const errors = LoginInputSchema.validate(body);

  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  const auth = await loginUser(body);

  res.status(200).send(auth);
}

const JWT_KEY = process.env.JWT_KEY || "";

async function generateToken(user: any) {
  return jwt.sign(user, JWT_KEY, { expiresIn: "1000" });
}

async function loginUser({ email, password }: any) {
  const pool = getDb();
  const query = select().from("users").where({ email }).toParams();
  const user = await pool.query(query).then((result) => result.rows[0]);

  loginDebug(`Found user with email ${user.email}`);

  if (!user) {
    return new Error("Unknown user or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    delete user.password;

    return { token: await generateToken(user), user };
  }

  return new Error("Unknown user or password");
}
