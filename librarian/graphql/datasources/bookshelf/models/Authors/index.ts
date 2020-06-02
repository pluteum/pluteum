import { Channel } from "amqplib";
import { sql, DatabasePoolType } from "slonik";

export default class Author {
  private pool: DatabasePoolType;
  private library: string;

  constructor(pool: DatabasePoolType, channel: Channel, library: string) {
    this.pool = pool;
    this.library = library;
  }

  public getAllAuthors() {
    const query = sql`SELECT * FROM "authors" WHERE "library" = ${this.library}`;

    return this.pool.any(query);
  }

  public getAuthorById(id: number) {
    const query = sql`SELECT * FROM "authors" WHERE "library" = ${this.library} AND "id" = ${id}`;
    return this.pool.maybeOne(query);
  }

  public getAuthorsOfBook(bookId: number) {
    const query = sql`
    SELECT "authors".*
    FROM "authors" JOIN "books_authors_link" ON "authors"."id" = "books_authors_link"."author"
    WHERE "books_authors_link"."book" = ${bookId} AND "authors"."library" = ${this.library}`;

    return this.pool.any(query);
  }
}
