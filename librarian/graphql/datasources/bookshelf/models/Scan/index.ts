import { sql, DatabasePoolType } from "slonik";
import { v4 as uuidv4 } from "uuid";

export default class Scan {
  private pool: DatabasePoolType;
  private library: string;

  constructor(pool: DatabasePoolType, library: string) {
    this.pool = pool;
    this.library = library;
  }

  public getScans() {
    const query = sql`SELECT * FROM "scans" WHERE "library" = ${this.library}`;

    return this.pool.any(query);
  }

  public getScanById(id: number) {
    const query = sql`SELECT * FROM "scans" WHERE "id" = ${id} AND "library" = ${this.library}`;

    return this.pool.maybeOne(query);
  }

  public addScan({ file, source, payload, error, queuedAt, finishedAt }: any) {
    const query = sql`
        INSERT INTO "scans" ("fileId", "uuid", "source", "payload", "error", "queuedAt", "finishedAt")
        VALUES (${file}, ${uuidv4()}, ${source}, ${payload}, ${error}, ${queuedAt}, ${finishedAt})
        RETURNING *
        `;

    return this.pool.one(query);
  }

  public getScansByFile(id: number) {
    const query = sql`
        SELECT "scans".* 
        FROM "scans" JOIN "files" ON "scans"."fileId" = "files"."id"
        WHERE "files"."id" = ${id}`;

    return this.pool.any(query);
  }

  public getFileByScan(id: number) {
    const query = sql`
        SELECT "files".* 
        FROM "scans" JOIN "files" ON "scans"."fileId" = "files"."id"
        WHERE "scans"."id" = ${id}`;

    return this.pool.maybeOne(query);
  }
}
