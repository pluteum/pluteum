import { PoolClient } from "pg";
import { select, insert } from "sql-bricks";
import {
  stat,
  mkdir,
  createWriteStream,
  ReadStream,
  WriteStream,
  access,
  ensureDir,
} from "fs-extra";
import { resolve } from "path";
import { Channel } from "amqplib";
import { v4 as uuidv4 } from "uuid";
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
    const query = select().from('files').where({ library: this.library }).toParams();

    return this.pool.query(query).then((result) => result.rows);
  }

  public getFileById(id: number) {
    const query = select()
      .from("files")
      .where({ id, library: this.library })
      .toParams();

    return this.pool.query(query).then((result) => result.rows[0]);
  }

  public async addFile(inputs: GraphQLUpload[]) {
    const input = await inputs[0];
    const uuid = uuidv4();
    const format = MIME_FORMAT_MAP[input.mimetype];
    const filePath = resolve(
      process.env.FILE_LOCATION || "",
      `${uuid}.${format}`
    );
    const url = `${process.env.URL}/files/${uuid}.${format}`;

    const inputStream = input.createReadStream();
    const outputStream = createWriteStream(filePath);
    let fileSize = 0;

    const upload = new Promise((resolve, reject) => {
      inputStream.on("data", (c) => (fileSize += c.length));

      inputStream
        .pipe(outputStream)
        .on("finish", () => resolve(true))
        .on("error", (e) => reject(e));
    });

    await upload;

    let file = {
      uuid,
      format,
      filePath,
      url,
      library: this.library,
      name: input.filename,
      size: fileSize / 1000,
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
  }
}
