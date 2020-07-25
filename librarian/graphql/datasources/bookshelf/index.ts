import { Channel } from "amqplib";
import { DataSource, DataSourceConfig } from "apollo-datasource";

import Author from "./models/Authors";
import Book from "./models/Book";
import Tag from "./models/Tags";
import File from "./models/File";
import AccessCard from "../access_card/index";
import { DatabasePoolType } from "slonik";
import Scan from "./models/Scan";
import { Client as MinioClient } from "minio";

export default class Bookshelf extends DataSource<any> {
  private pool: DatabasePoolType;
  private channel: Channel;
  private fileClient: MinioClient;
  private context: any;

  public books!: Book;
  public tags!: Tag;
  public authors!: Author;
  public files!: File;
  public scans!: Scan;
  private accessCard!: AccessCard;

  private library!: string;

  constructor(pool: DatabasePoolType, channel: Channel, minio: MinioClient) {
    super();

    this.pool = pool;
    this.channel = channel;
    this.fileClient = minio;
    this.accessCard = new AccessCard(this.pool, this.channel);
  }

  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
    this.library = this.context.library;

    this.accessCard.initialize(config);

    this.books = new Book(this.pool, this.channel, this.library);
    this.tags = new Tag(this.pool, this.library);
    this.authors = new Author(this.pool, this.channel, this.library);
    this.files = new File(
      this.pool,
      this.channel,
      this.fileClient,
      this.accessCard,
      this.library
    );
    this.scans = new Scan(
      this.pool,
      this.channel,
      this.accessCard,
      this.library
    );
  }
}
