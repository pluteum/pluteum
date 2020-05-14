import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { insert } from "sql-bricks";
import Schema from "validate";
import { v4 as uuid } from "uuid";
import debug from "debug";

import { createLibrary } from "../library/create";
import { PoolClient } from "pg";

const registerDebug = debug("pluteum:accesscard:register");

export default async function registerUser({ firstName, lastName, email, password }: any, pool: PoolClient) {

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
