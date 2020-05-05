import { DataSource, DataSourceConfig } from "apollo-datasource";
import Axios, { AxiosInstance, AxiosStatic } from "axios";

export default class AccessCard extends DataSource<any> {
  private context: any;
  private axios?: AxiosInstance;

  constructor() {
    super();
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
      .then((response) => response.data)
      .catch((e) => {
        if (e.response.status === 401) {
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
