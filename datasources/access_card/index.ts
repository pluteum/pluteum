import { DataSource, DataSourceConfig } from "apollo-datasource";
import Axios, { AxiosInstance, AxiosStatic } from "axios";

export default class AccessCard extends DataSource<any> {
  private context: any;
  private axios?: AxiosInstance;

  constructor() {
    super();
  }

  private parseRefreshCookie(headers: any) {
    const COOKIE_NAME = "accesscard-refresh";

    const cookie = headers["set-cookie"].find((cookie: string) =>
      cookie.includes(COOKIE_NAME)
    );

    return cookie.substring(
      COOKIE_NAME.length + 1, // adding one to account for the equals sign!
      cookie.indexOf(";")
    );
  }

  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;

    this.axios = Axios.create({
      baseURL: `${process.env.URL}/access`,
      timeout: 1000,
      headers: {
        Cookie: `accesscard-refresh=${this.context.token}`,
      },
    });
  }

  public login(user: any) {
    return this.axios
      ?.post("/user/login", user)
      .then((response) => {
        return {
          data: response.data,
          refreshToken: this.parseRefreshCookie(response.headers),
        };
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          return new Error("UNAUTHORIZED");
        }

        return new Error("ERROR");
      });
  }

  public register(user: any) {
    return this.axios
      ?.put("/user/register", user)
      .then((response) => response.data)
      .catch((e) => new Error(e.response.data.error));
  }

  public getUser() {} // TODO

  public getLibraries() {} // TODO
}
