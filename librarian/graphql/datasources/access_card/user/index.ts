import { PoolClient } from "pg";
import loginUser from "./login";
import registerUser from "./registration";
import refresh from "./refresh";

export default class User {
    private pool: PoolClient;

    constructor(pool: PoolClient) {
        this.pool = pool;
    }

    public login = (input: any) => loginUser(input, this.pool);
    public register = (input: any) => registerUser(input, this.pool);
    public refresh = (token: string) => refresh(token, this.pool);
}