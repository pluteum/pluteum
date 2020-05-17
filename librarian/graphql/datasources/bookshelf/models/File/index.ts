import { Channel } from "amqplib";
import { createWriteStream, ReadStream, remove } from "fs-extra";
import { resolve } from "path";
import { PoolClient } from "pg";
import { insert, select, delete as deleteQuery } from "sql-bricks";
import { v4 as uuidv4 } from "uuid";
import digestStream from "digest-stream";

import MIME_FORMAT_MAP from "../../constants/mimetypes";

type GraphQLUpload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => ReadStream;
};

export default class Files {
  private pool: PoolClient;
  private channel: Channel;
  private library: string;

  constructor(pool: PoolClient, channel: Channel, library: string) {
    this.pool = pool;
    this.channel = channel;
    this.library = library;
  }

  public getFiles() {
    const query = select()
      .from("files")
      .where({ library: this.library })
      .toParams();

    return this.pool.query(query).then((result) => result.rows);
  }

  public getFileById(id: number) {
    const query = select()
      .from("files")
      .where({ id, library: this.library })
      .toParams();

    return this.pool.query(query).then((result) => result.rows[0]);
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

    let md5;
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

    const isUnique = await this.pool
      .query(
        select().from("files").where({ library: this.library, md5 }).toParams()
      )
      .then((result) => result.rowCount === 0);

    if (isUnique) {
      let file = {
        uuid,
        md5,
        format,
        filePath,
        url,
        library: this.library,
        name: input.filename,
        size: dataLength / 1000,
      };

      const query = insert("files", file).toParams();
      query.text = `${query.text} RETURNING *`;

      return this.pool
        .query(query)
        .then((result) => result.rows[0])
        .then((fileRow) => {
          if (fileRow.format === "pdf") {
            this.channel.sendToQueue(
              "monocle_pdf_isbn",
              Buffer.from(JSON.stringify(fileRow))
            );
          }

          return fileRow;
        });
    } else {
      await remove(filePath);
      return new Error("File already exists");
    }
  }

  public async deleteFile(fileId: number) {
    const selectQuery = select("filepath")
      .from("files")
      .where({ library: this.library, id: fileId })
      .toParams();

    const file = await this.pool
      .query(selectQuery)
      .then((result) => result.rows[0]);

    if (file) {
      await remove(file.filePath);

      return this.pool
        .query(
          deleteQuery("files")
            .where({ library: this.library, id: fileId })
            .toParams()
        )
        .then(() => true);
    } else {
      return false;
    }
  }
}
