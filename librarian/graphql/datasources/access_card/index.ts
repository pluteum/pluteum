import { DataSource, DataSourceConfig } from "apollo-datasource";
import { PoolClient } from "pg";
import User from "./user";
import Library from "./library";
import { Channel } from "amqplib";

export default class AccessCard extends DataSource<any> {
  private context: any;
  private pool: PoolClient;
  private channel: Channel;

  public user: User;
  public library: Library;

  constructor(pool: PoolClient, channel: Channel) {
    super();
    this.pool = pool;
    this.channel = channel;

    this.user = new User(pool, channel);
    this.library = new Library(pool);
  }

  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }
}
