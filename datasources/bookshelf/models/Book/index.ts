import { PoolClient } from "pg";
import { select, insert } from "sql-bricks";
import {
  stat,
  mkdir,
  createWriteStream,
  ReadStream,
  WriteStream,
  access,
  ensureDir,
} from "fs-extra";
import { resolve } from "path";
import { Channel } from "amqplib";

export default class Book {
  private pool: PoolClient;
  private channel: Channel;
  private library: string;

  constructor(pool: PoolClient, channel: Channel, library: string) {
    this.pool = pool;
    this.channel = channel;
    this.library = library;
  }

  public getAllBooks() {
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
    // NOTE: removing file handling from books, will be handled under Files instead and linked there,
    // adding a book on it's own without a file is and should be possible, similarly, files can be uploaded
    // independently of a book, Bookshelf does not try to associate them with a book, Monocle will though
    // if it can find an ISBN or other linking information

    // TODO: validate
    // TODO: uid generation
    const { authors, file, ...book } = input; // look, blame the javascript aliens, this is just the shortest way to do this
    console.log(authors, file, book);

    const query = insert("books", {
      library: this.library,
      ...book,
    }).toParams();
    query.text = `${query.text} RETURNING *`; // return new book

    const newBook = await this.pool
      .query(query)
      .then((result) => result.rows[0]);

    if (authors) {
      authors.forEach(async (author: any) => {
        let id = author.id;

        if (!id && author.name) {
          // look up by name, if existing, use that author, otherwise new author
          // TODO: probably a way to do this in one SQL query
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
            id = authorID;
          } else {
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

        const linkingQuery = insert("books_authors_link", {
          book: newBook.id,
          author: id,
        }).toParams();

        await this.pool.query(linkingQuery);
      });
    }

    if (file) {
      const linkingQuery = insert("books_files_link", {
        book: newBook.id,
        file: newBook.id,
      }).toParams();

      await this.pool.query(linkingQuery);
    }

    return newBook;
  }
}
