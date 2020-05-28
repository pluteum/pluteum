import { DatabasePoolType, sql } from "slonik";
import { v4 as uuid } from "uuid";

export default class Library {
  private pool: DatabasePoolType;

  constructor(pool: DatabasePoolType) {
    this.pool = pool;
  }

  public create = ({ title, userId }: any) =>
    this.pool
      .one(
        sql`INSERT INTO "libraries" (title, uuid) VALUES (${title}, ${uuid()})`
      )
      .then(async (library) => ({
        library,
        link: await this.pool.one(
          sql`INSERT INTO "users_libraries_link" (user, library, default) VALUES (${userId}, ${library.id}, true)`
        ),
      }))
      .then(({ library }) => library);

  public fetch = (id: any) =>
    this.pool.maybeOne(sql`SELECT * FROM "libraries" WHERE "id" = ${id}`);
}
