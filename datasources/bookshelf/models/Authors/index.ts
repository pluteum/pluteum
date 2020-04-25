import { PoolClient } from "pg";
import { select } from "sql-bricks";
import { Channel } from "amqplib";

export default class Author {
    private pool: PoolClient;
    private library: string;

    constructor(pool: PoolClient, channel: Channel, library: string) {
        this.pool = pool;
        this.library = library;
    }

    public getAllAuthors() {
        const query = select().from('authors').where({library: this.library}).toParams();

        return this.pool.query(query).then((result) => result.rows);
    }

    public getAuthorById(id: number) {
        const query = select().from('authors').where({ id, library: this.library }).toParams();

        return this.pool.query(query).then((result) => result.rows[0]);
    }

    public getAuthorOfBook(bookId: number) {
        const query = select().from('authors').join('books_authors_link').on('authors.id', 'books_authors_link.author').where({'books_authors_link.book': bookId}).toParams();

        return this.pool.query(query).then((result) => result.rows[0]);
    }
}