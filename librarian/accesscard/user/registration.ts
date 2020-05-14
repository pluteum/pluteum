import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { insert } from "sql-bricks";
import Schema from "validate";
import { v4 as uuid } from "uuid";
import debug from "debug";
import { getDb } from "../db";
import { createLibrary } from "../library/create";

const registerDebug = debug("pluteum:accesscard:register");

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

export default async function registrationHandler(req: Request, res: Response) {
  // Validate request
  const { body } = req;

  const errors = RegisterInputSchema.validate(body);

  if (errors.length > 0) {
    registerDebug(`400 ${errors}`);
    return res.status(400).send({ errors });
  }

  try {
    const user = await registerUser(body);
    registerDebug(
      `Successfully registered user ${user.email} with ID ${user.id}`
    );

    return res.status(200).send(user);
  } catch (e) {
    if (e.code === "23505") {
      // Unique Error
      const error = new Error("A user with this email address already exists");
      registerDebug(error);
      return res.status(400).send({ error: error.message });
    }

    return res.status(500).send();
  }
}

async function registerUser({ firstName, lastName, email, password }: any) {
  const pool = getDb();

  const hashedPassword = await bcrypt.hash(password, 10);

  registerDebug(
    `Attempting to register ${firstName} ${lastName} with email ${email}`
  );

  const query = insert("users", {
    firstName,
    lastName,
    email,
    uuid: uuid(),
    password: hashedPassword,
  }).toParams();

  query.text = `${query.text} RETURNING "id", "firstName", "lastName", "email"`; // returning via postgres

  const user = await pool.query(query).then((result) => result.rows[0]);

  try {
    await createLibrary({
      userId: user.id,
      title: `${user.firstName}'s Library`,
      defaultLibrary: true,
    });
  } catch (error) {
    console.error(error);
  }

  return user;
}
