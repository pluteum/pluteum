import { Pool } from "pg";

let _db: Pool;

export async function initDb(): Promise<void> {
  const pool = new Pool();
  await pool.connect();
}

export function getDb(): Pool {
  return _db;
}
