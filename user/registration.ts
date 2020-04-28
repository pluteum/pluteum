import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { insert } from "sql-bricks";
import Schema from "validate";

import { getDb } from "../db";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterInputSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
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

export default function registrationHandler(req: Request, res: Response) {
  // Validate request
  const { body } = req;

  const errors = RegisterInputSchema.validate(body);

  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  return registerUser(body);
}

async function registerUser({ firstName, lastName, email, password }: any) {
  const pool = getDb();

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = insert("users", {
    firstName,
    lastName,
    email,
    password: hashedPassword,
  }).toParams();

  query.text = `${query.text} RETURNING "id", "firstName", "lastName", "email"`; // returning via postgres

  return pool.query(query).then((result) => result.rows[0]);
}
