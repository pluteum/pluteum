import { DataSource, DataSourceConfig } from "apollo-datasource";
import User from "./user";
import Library from "./library";
import { Channel } from "amqplib";
import Service from "./services";
import { DatabasePoolType } from "slonik";

export default class AccessCard extends DataSource<any> {
  private context: any;
  private pool: DatabasePoolType;
  private channel: Channel;

  public user: User;
  public library: Library;
  public service: Service;

  constructor(pool: DatabasePoolType, channel: Channel) {
    super();
    this.pool = pool;
    this.channel = channel;

    this.user = new User(pool, channel);
    this.library = new Library(pool);
    this.service = new Service();
  }

  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }
}
