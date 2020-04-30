import debug from "debug";
import { Request, Response } from "express";
import { select } from "sql-bricks";
import Schema from "validate";

import { getDb } from "../db";

const createLibraryDebug = debug("pluteum:accesscard:library:create");

const FetchLibraryInput = new Schema({
  id: {
    type: Number,
    required: true,
  },
});

export default async function fetchHandler(req: Request, res: Response) {
  // Validate request
  const { body } = req;

  const errors = FetchLibraryInput.validate(body);

  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  const library = await fetchLibrary(body);

  res.status(200).send(library);
}

async function fetchLibrary({ id }: any) {
  const pool = getDb();

  createLibraryDebug(`Attempting to create library ${id}`);

  const query = select().from("library").where({ id }).toParams();

  const library = await pool.query(query).then((result) => result.rows[0]);

  return library;
}
