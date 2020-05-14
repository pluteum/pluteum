import debug from "debug";
import { insert } from "sql-bricks";
import { v4 as uuid } from "uuid";
import { PoolClient } from "pg";


const createLibraryDebug = debug("pluteum:accesscard:library:create");

export async function createLibrary({
  title,
  userId,
  defaultLibrary = false,
}: any, pool: PoolClient) {

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
