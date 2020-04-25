import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Pool, PoolConfig, PoolClient } from 'pg';
import Book from './models/Book/index';
import Author from './models/Authors/index';
import { Channel }  from 'amqplib';
import File from './models/File/index';

export default class Bookshelf extends DataSource<any> {
    private pool: PoolClient;
    private channel: Channel;
    private context: any;

    public books!: Book;
    public authors!: Author;
    public files!: File;

    private library!: string;

    constructor(pool: PoolClient, channel: Channel) {
        super();

        this.pool = pool;
        this.channel = channel;
    }

    public initialize(config: DataSourceConfig<any>) {
        this.context = config.context;
        this.library = this.context.user.library;

        this.books = new Book(this.pool, this.channel, this.library);
        this.authors = new Author(this.pool, this.channel, this.library);
        this.files = new File(this.pool, this.channel, this.library);
    }
}