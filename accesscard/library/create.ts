import debug from "debug";
import { Request, Response } from "express";
import { insert } from "sql-bricks";
import { v4 as uuid } from "uuid";
import Schema from "validate";

import { getDb } from "../db";

const createLibraryDebug = debug("pluteum:accesscard:library:create");

const CreateLibraryInput = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
  },
  defaultLibrary: {
    type: Boolean,
  },
});

export default async function createHandler(req: Request, res: Response) {
  // Validate request
  const { body } = req;

  const errors = CreateLibraryInput.validate(body);

  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  const library = await createLibrary(body);

  res.status(200).send(library);
}

export async function createLibrary({
  title,
  userId,
  defaultLibrary = false,
}: any) {
  const pool = getDb();

  createLibraryDebug(`Attempting to create library ${title}`);

  const query = insert("libraries", { title, uuid: uuid() }).toParams();

  query.text = `${query.text} RETURNING "id", "uuid", "title"`; // returning via postgres

  const library = await pool.query(query).then((result) => result.rows[0]);

  if (userId) {
    const linkingQuery = insert("users_libraries_link", {
      user: userId,
      library: library.id,
      default: defaultLibrary,
    }).toParams();

    await pool.query(linkingQuery);
  }

  return library;
}
