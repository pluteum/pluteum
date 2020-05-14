import debug from "debug";
import { select } from "sql-bricks";
import { PoolClient } from "pg";

const createLibraryDebug = debug("pluteum:accesscard:library:create");

export async function fetchLibrary({ id }: any, pool: PoolClient) {

  createLibraryDebug(`Attempting to create library ${id}`);

  const query = select().from("library").where({ id }).toParams();

  const library = await pool.query(query).then((result) => result.rows[0]);

  return library;
}
