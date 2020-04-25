import { PoolClient } from "pg";
import { select, insert } from "sql-bricks";
import { v4 as uuidv4 } from "uuid";
import { Channel } from "amqplib";
import Debug from "debug";

const bookModelDebug = Debug("pluteum:bookshelf:book");

export default class Book {
  private pool: PoolClient;
  private channel: Channel;
  private library: string;

  constructor(pool: PoolClient, channel: Channel, library: string) {
    this.pool = pool;
    this.channel = channel;
    this.library = library;
  }

  public getBooks() {
    const query = select()
      .from("books")
      .where({ library: this.library })
      .toParams();

    return this.pool.query(query).then((result) => result.rows);
  }

  public getBooksByAuthor(authorId: number) {
    const query = select()
      .from("books")
      .join("books_authors_link")
      .on("books.id", "books_authors_link.book")
      .where({ "books_authors_link.author": authorId })
      .toParams();

    return this.pool.query(query).then((result) => result.rows);
  }

  public getBookById(id: number) {
    const query = select()
      .from("books")
      .where({ id, library: this.library })
      .toParams();

    return this.pool.query(query).then((result) => result.rows[0]);
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
