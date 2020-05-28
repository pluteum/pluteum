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
    const query = select()
      .from("authors")
      .where({ id, library: this.library })
      .toParams();

    return this.pool.query(query).then((result) => result.rows[0]);
  }

  public getAuthorsOfBook(bookId: number) {
    const query = select("authors.*")
      .from("authors")
      .join("books_authors_link")
      .on("authors.id", "books_authors_link.author")
      .where({ "books_authors_link.book": bookId })
      .toParams();

    return this.pool.query(query).then((result) => result.rows);
  }
}
