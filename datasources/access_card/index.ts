import { DataSource, DataSourceConfig } from "apollo-datasource";
import Axios from "axios";

export default class Bookshelf extends DataSource<any> {
  private context: any;

  constructor() {
    super();
  }

  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }

  public login() {} // TODO

  public register() {} // TODO

  public getUser() {} // TODO

  public getLibraries() {} // TODO
}
