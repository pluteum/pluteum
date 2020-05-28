import { PoolClient } from "pg";
import { select, insert } from "sql-bricks";
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
    book.uuid = uuidv4();

    const query = insert("books", book).toParams();
    query.text = `${query.text} RETURNING *`; // return new book

    const newBook = await this.pool
      .query(query)
      .then((result) => result.rows[0]);

    if (authors) {
      authors.forEach(async (author: any) => {
        let id = author.id;

        if (!id && author.name) {
          bookModelDebug(
            `No Author ID found for ${book.uuid}, attempting to look up name ${author.name}`
          );
          const authorID = await this.pool
            .query(
              select("id")
                .from("authors")
                .where({ name: author.name })
                .toParams()
            )
            .then((result) => (result.rows[0] ? result.rows[0].id : undefined));

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
            let newAuthorQuery = insert("authors", {
              name: author.name,
              library: this.library,
            }).toParams();
            newAuthorQuery.text = `${newAuthorQuery.text} RETURNING "id"`; // return id

            id = await this.pool
              .query(newAuthorQuery)
              .then((result) => result.rows[0].id);
          }
        }

        bookModelDebug(`Linking author ${id} and book ${newBook.id} together`);
        const linkingQuery = insert("books_authors_link", {
          book: newBook.id,
          author: id,
        }).toParams();

        await this.pool.query(linkingQuery);
      });
    }

    if (file) {
      bookModelDebug(`Linking file ${file.id} and book ${newBook.id} together`);
      const linkingQuery = insert("books_files_link", {
        book: newBook.id,
        file: file.id,
      }).toParams();

      await this.pool.query(linkingQuery);
    }

    return newBook;
  }
}
