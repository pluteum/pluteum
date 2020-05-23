import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { insert } from "sql-bricks";
import Schema from "validate";
import { v4 as uuid } from "uuid";
import debug from "debug";
import { wrapError, UniqueViolationError } from "db-errors";

import { createLibrary } from "../library/create";
import { PoolClient } from "pg";
import { ValidationError, UserInputError } from "apollo-server-express";

const registerDebug = debug("pluteum:accesscard:register");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const InputSchema = new Schema({
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
    length: { min: 4 },
    required: true,
  },
});

export default async function registerUser(
  { firstName, lastName, email, password }: any,
  pool: PoolClient
) {
  const validationErrors = InputSchema.validate({
    firstName,
    lastName,
    email,
    password,
  });

  if (validationErrors.length) {
    throw new UserInputError("Invalid Registration Input");
  }

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

  return pool
    .query(query)
    .then((result) => result.rows[0])
    .then((user) =>
      createLibrary(
        {
          userId: user.id,
          title: `${user.firstName}'s Library`,
          defaultLibrary: true,
        },
        pool
      ).then(() => user)
    )
    .catch((e) => {
      if (e.code && e.code === 23505) {
        throw new ValidationError(
          `A user with the email address ${email} already exists.`
        );
      }

      throw e;
    });
}
