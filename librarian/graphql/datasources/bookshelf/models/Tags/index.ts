import { sql, DatabasePoolType } from "slonik";

export default class Tag {
  private pool: DatabasePoolType;
  private library: string;

  constructor(pool: DatabasePoolType, library: string) {
    this.pool = pool;
    this.library = library;
  }

  public getAllTags() {
    const query = sql`SELECT * FROM "tags" WHERE "library" = ${this.library}`;

    return this.pool.any(query);
  }

  public getTagById(id: number) {
    const query = sql`SELECT * FROM "tags" WHERE "library" = ${this.library} AND "id" = ${id}`;
    return this.pool.maybeOne(query);
  }

  public getTagByName(name: string) {
    const query = sql`SELECT * FROM "tags" WHERE "library" = ${this.library} AND "name" = ${name}`;
    return this.pool.maybeOne(query);
  }

  public getBooksTags(bookId: number) {
    const query = sql`
        SELECT "tags".*
        FROM "tags" JOIN "books_tags_link" ON "tags"."id" = "books_tags_link"."tag"
        WHERE "books_tags_link"."book" = ${bookId} AND "tags"."library" = ${this.library}`;

    return this.pool.any(query);
  }

  public getBooksByTag(tag: number) {
    const query = sql`
      SELECT "books".*
      FROM "books" JOIN "books_tags_link" ON "books"."id" = "books_tags_link"."book"
      WHERE "books_tags_link"."tag" = ${tag} AND "books"."library" = ${this.library}`;

    return this.pool.any(query);
  }
}
