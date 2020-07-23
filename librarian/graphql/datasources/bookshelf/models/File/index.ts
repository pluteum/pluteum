import { Channel } from "amqplib";
import { createWriteStream, ReadStream, remove } from "fs-extra";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";
import digestStream from "digest-stream";

import MIME_FORMAT_MAP from "../../constants/mimetypes";
import AccessCard from "../../../access_card";
import { sql, DatabasePoolType } from "slonik";
import { Client } from "minio";

type GraphQLUpload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => ReadStream;
};

export default class Files {
  private pool: DatabasePoolType;
  private channel: Channel;
  private storage: Client;
  private accessCard: AccessCard;
  private library: string;

  constructor(
    pool: DatabasePoolType,
    channel: Channel,
    storage: Client,
    accessCard: AccessCard,
    library: string
  ) {
    this.pool = pool;
    this.channel = channel;
    this.library = library;
    this.storage = storage;
    this.accessCard = accessCard;
  }

  public getFiles() {
    const query = sql`SELECT * FROM "files" WHERE "library" = ${this.library}`;

    return this.pool.any(query);
  }

  public getFileById(id: number) {
    const query = sql`SELECT * FROM "files" WHERE "id" = ${id} AND "library" = ${this.library}`;

    return this.pool.maybeOne(query);
  }

  public async addFile(newFile: Promise<GraphQLUpload>) {
    const input = await newFile;
    const uuid = uuidv4();
    const format = MIME_FORMAT_MAP[input.mimetype];
    const name = `files/${uuid}.${format}`;

    const inputStream = input.createReadStream();

    let md5 = "";
    let dataLength = 0;

    const digestFn = (resultDigest: string, length: number) => {
      md5 = resultDigest;
      dataLength = length;
    };

    const dstream = digestStream("md5", "hex", digestFn);

    const upload = this.storage.putObject(
      "pluteum",
      name,
      inputStream.pipe(dstream)
    );

    await upload;

    const isNotUnique = await this.pool.maybeOneFirst(
      sql`SELECT "md5" FROM "files" WHERE "library" = ${this.library} AND "md5" = ${md5}`
    );

    if (!isNotUnique) {
      const query = sql`
        INSERT INTO "files" ("uuid", "md5", "format", "path", "library", "name", "size")
        VALUES (${uuid}, ${md5}, ${format}, ${name}, ${this.library}, ${
        input.filename
      }, ${dataLength / 1000})
        RETURNING *
      `;

      return this.pool.one(query);
    } else {
      await this.storage.removeObject("pluteum", name);
      throw new Error("File already exists");
    }
  }

  public async deleteFile(fileId: number) {
    const selectQuery = sql`SELECT "path" FROM "files" WHERE "library" = ${this.library} AND "id" = ${fileId}`;

    const path = await this.pool.maybeOneFirst(selectQuery);

    if (path) {
      await this.storage.removeObject("pluteum", path.toString());

      return this.pool
        .query(
          sql`DELETE FROM "files" WHERE "library" = ${this.library} AND "id" = ${fileId}`
        )
        .then(() => true);
    } else {
      return false;
    }
  }
}
