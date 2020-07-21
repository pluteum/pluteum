import { Channel } from "amqplib";
import { createWriteStream, ReadStream, remove } from "fs-extra";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";
import digestStream from "digest-stream";

import MIME_FORMAT_MAP from "../../constants/mimetypes";
import AccessCard from "../../../access_card";
import { sql, DatabasePoolType } from "slonik";

type GraphQLUpload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => ReadStream;
};

export default class Files {
  private pool: DatabasePoolType;
  private channel: Channel;
  private accessCard: AccessCard;
  private library: string;

  constructor(
    pool: DatabasePoolType,
    channel: Channel,
    accessCard: AccessCard,
    library: string
  ) {
    this.pool = pool;
    this.channel = channel;
    this.library = library;
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
    const filePath = resolve(
      process.env.FILE_LOCATION || "",
      `${uuid}.${format}`
    );
    const url = `${process.env.URL}/files/${uuid}.${format}`;

    const inputStream = input.createReadStream();
    const outputStream = createWriteStream(filePath);

    let md5 = "";
    let dataLength = 0;

    const digestFn = (resultDigest: string, length: number) => {
      md5 = resultDigest;
      dataLength = length;
    };

    const dstream = digestStream("md5", "hex", digestFn);

    const upload = new Promise((resolve, reject) => {
      inputStream
        .pipe(dstream)
        .pipe(outputStream)
        .on("finish", () => resolve(true))
        .on("error", (e: Error) => reject(e));
    });

    await upload;

    const isNotUnique = await this.pool.maybeOneFirst(
      sql`SELECT "md5" FROM "files" WHERE "library" = ${this.library} AND "md5" = ${md5}`
    );

    if (!isNotUnique) {
      const query = sql`
        INSERT INTO "files" ("uuid", "md5", "format", "filePath", "url", "library", "name", "size")
        VALUES (${uuid}, ${md5}, ${format}, ${filePath}, ${url}, ${
        this.library
      }, ${input.filename}, ${dataLength / 1000})
        RETURNING *
      `;

      return this.pool.one(query);
    } else {
      await remove(filePath);
      throw new Error("File already exists");
    }
  }

  public async deleteFile(fileId: number) {
    const selectQuery = sql`SELECT "filePath" FROM "files" WHERE "library" = ${this.library} AND "id" = ${fileId}`;

    const filePath = await this.pool.maybeOneFirst(selectQuery);

    if (filePath) {
      await remove(filePath.toString());

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
