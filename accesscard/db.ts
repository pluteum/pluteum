import { Pool, PoolClient } from "pg";

let _db: PoolClient;

export async function initDb(): Promise<void> {
  const pool = new Pool();
  _db = await pool.connect();
}

export function getDb(): PoolClient {
  return _db;
}
