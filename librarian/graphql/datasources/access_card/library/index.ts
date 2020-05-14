import { PoolClient } from "pg";

import { createLibrary } from "./create";
import { fetchLibrary } from "./fetch";

export default class Library {
    private pool: PoolClient;

    constructor(pool: PoolClient) {
        this.pool = pool;
    }

    public create = (input: any) => createLibrary(input, this.pool)
    public fetch = (input: any) => fetchLibrary(input, this.pool)
}