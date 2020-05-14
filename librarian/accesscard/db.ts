import { PoolClient } from "pg";

let _db: PoolClient;

export async function setDb(pool: PoolClient): Promise<void> {
  _db = pool;
}

export function getDb(): PoolClient {
  return _db;
}
