import { PoolClient } from "pg";
import loginUser from "./login";
import registerUser from "./registration";
import refresh from "./refresh";
import forgot from "./forgot";
import { Channel } from "amqplib";
import reset from "./reset";

export default class User {
  private pool: PoolClient;
  private channel: Channel;

  constructor(pool: PoolClient, channel: Channel) {
    this.pool = pool;
    this.channel = channel;
  }

  public login = (input: any) => loginUser(input, this.pool);
  public register = (input: any) => registerUser(input, this.pool);
  public refresh = (token: string) => refresh(token, this.pool);
  public forgot = (email: string) => forgot(email, this.pool, this.channel);
  public reset = (token: string, password: string) =>
    reset(token, password, this.pool);
}
