import { DataSource, DataSourceConfig } from "apollo-datasource";
import { PoolClient } from "pg";
import User from "./user";
import Library from "./library";

export default class AccessCard extends DataSource<any> {
  private context: any;
  private pool: PoolClient;

  public user: User;
  public library: Library;

  constructor(pool: PoolClient) {
    super();
    this.pool = pool;

    this.user = new User(pool);
    this.library = new Library(pool);
  }

  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }
}
