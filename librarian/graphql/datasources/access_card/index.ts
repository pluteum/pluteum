import { DataSource, DataSourceConfig } from "apollo-datasource";

export default class AccessCard extends DataSource<any> {
  private context: any;

  constructor() {
    super();
  }

  // private parseRefreshCookie(headers: any) {
  //   const COOKIE_NAME = "accesscard-refresh";

  //   const cookie = headers["set-cookie"].find((cookie: string) =>
  //     cookie.includes(COOKIE_NAME)
  //   );

  //   return cookie.substring(
  //     COOKIE_NAME.length + 1, // adding one to account for the equals sign!
  //     cookie.indexOf(";")
  //   );
  // }

  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;

  }

  public login(user: any) {

  }

  public register(user: any) {

  }
}
