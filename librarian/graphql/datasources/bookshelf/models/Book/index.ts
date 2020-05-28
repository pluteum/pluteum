import { v4 as uuidv4 } from "uuid";
import { Channel } from "amqplib";
import Debug from "debug";
import { sql, DatabasePoolType } from "slonik";

const bookModelDebug = Debug("pluteum:bookshelf:book");

export default class Book {
  private pool: DatabasePoolType;
  private channel: Channel;
  private library: string;

  constructor(pool: DatabasePoolType, channel: Channel, library: string) {
    this.pool = pool;
    this.channel = channel;
    this.library = library;
  }

  public getBooks() {
    const query = sql`SELECT * FROM "books" WHERE "library" = ${this.library}`;

    return this.pool.any(query);
  }

  public getBookByFile(fileId: number) {
    const query = sql`
      SELECT "books.*" 
      FROM "books" JOIN "books_files_link" ON "books.id" = "books_files_link.book"
      WHERE "books_files_link.file" = ${fileId}`;

    return this.pool.maybeOne(query);
  }

  public getBooksByAuthor(authorId: number) {
    const query = sql`
      SELECT *
      FROM "books" JOIN "books_authors_link" ON "books"."id" = "books_authors_link"."author"
      WHERE "books_authors_link"."author" = ${authorId}
    `;

    return this.pool.any(query);
  }

  public getBookById(id: number) {
    const query = sql`SELECT * FROM "books" WHERE "library" = ${this.library} AND "id" = ${id}`;

    return this.pool.maybeOne(query);
  }

  public async saveBook(input: any) {
    let { authors, file, ...book } = input;

    book.library = this.library;

    const query = sql`
      INSERT INTO "books" ("uuid", "title", "isbn", "seriesIndex", "library")
      VALUES (${uuidv4()}, ${book.title}, ${book.isbn}, ${book.seriesIndex}, ${
      this.library
    })
      RETURNING *
    `;

    const newBook = await this.pool.one(query);

    if (authors) {
      authors.forEach(async (author: any) => {
        let id = author.id;

        if (!id && author.name) {
          bookModelDebug(
            `No Author ID found for ${book.uuid}, attempting to look up name ${author.name}`
          );
          const authorID = await this.pool.maybeOneFirst(
            sql`SELECT "id" FROM "authors" WHERE "name" = ${author.name} LIMIT 1`
          );

          if (authorID) {
            // author exists, this is the ID
            bookModelDebug(
              `Found an existing author with the name ${author.name}, ID ${authorID}`
            );
            id = authorID;
          } else {
            bookModelDebug(
              `Unable to find an existing author with name ${author.name}, adding to Author table`
            );
            const newAuthorQuery = sql`
              INSERT INTO "authors" ("name", "library")
              VALUES (${author.name}, ${this.library})
              RETURNING "id"
            `;

            id = await this.pool.oneFirst(newAuthorQuery);
          }
        }

        bookModelDebug(`Linking author ${id} and book ${newBook.id} together`);
        const linkingQuery = sql`
          INSERT INTO "books_authors_link" ("book", "author")
          VALUES (${newBook.id}, ${id})
        `;

        await this.pool.query(linkingQuery);
      });
    }

    if (file) {
      bookModelDebug(`Linking file ${file.id} and book ${newBook.id} together`);
      const linkingQuery = sql`
        INSERT INTO "books_files_link" ("book", "file")
        VALUES (${newBook.id}, ${file.id})
      `;

      await this.pool.query(linkingQuery);
    }

    return newBook;
  }
}
