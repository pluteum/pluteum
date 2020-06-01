import { sql, DatabasePoolType } from "slonik";
import { v4 as uuidv4 } from "uuid";
import { Channel } from "amqplib";
import AccessCard from "../../../access_card";

export default class Scan {
  private pool: DatabasePoolType;
  private accessCard: AccessCard;
  private channel: Channel;
  private library: string;

  constructor(
    pool: DatabasePoolType,
    channel: Channel,
    accessCard: AccessCard,
    library: string
  ) {
    this.pool = pool;
    this.channel = channel;
    this.accessCard = accessCard;
    this.library = library;
  }

  public startScan(file: any) {
    const query = sql`
      INSERT INTO "scans" ("fileId", "uuid", "queuedAt") 
      VALUES (${file.id}, ${uuidv4()}, now())
      RETURNING *`;

    return this.pool.one(query).then((scan) => {
      this.channel.sendToQueue(
        "monocle_file_scan",
        Buffer.from(
          JSON.stringify({
            token: this.accessCard.service.generateToken(this.library),
            scan,
            file,
          })
        )
      );

      return scan;
    });
  }

  public finishScan(scan: any) {
    const query = sql`
      UPDATE "scans"
      SET 
        "finishedAt" = ${scan.finishedAt}, 
        "error" = ${scan.error || ""}, 
        "payload" = ${scan.payload || ""}, 
        "source" = ${scan.source || ""}
      WHERE "uuid" = ${scan.uuid}
      RETURNING *`;

    return this.pool.one(query);
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
