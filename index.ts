import ampq from "amqplib";
import axios, { AxiosAdapter } from "axios";
import { resolve } from "path";
import { createWriteStream, writeFile } from "fs-extra";
import pdf from "pdf-parse";

async function downloadFile(url: string, uuid: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  })

  const buffers: Buffer[] = [];

  const stream = response.data;

  stream.on("data", (c: Buffer) => buffers.push(c));

  return new Promise((resolve, reject) => {
    stream.on("end", () => {resolve(Buffer.concat(buffers))});
    stream.on("error", reject);
  });
}

ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel())
  .then((channel) => {
    channel.consume("monocle_pdf_isbn", async (msg) => {
      if (msg) {
        const file = JSON.parse(msg.content.toString() || "");

        const buffer = await downloadFile(file.url, file.uuid);

        await pdf(buffer).then(function(data: any) {
            const text = data.text;

            const isbni = text.indexOf('ISBN');
            const isbn13i = text.indexOf('ISBN-10');
            const isbn10i = text.indexOf('ISBN-13');

            console.log(text.slice(isbni, text.indexOf('\n', isbni)))
            console.log(text.slice(isbn10i, text.indexOf('\n', isbn10i)))
            console.log(text.slice(isbn13i, text.indexOf('\n', isbn13i)))
        });

        channel.ack(msg)
      }
    });
  });
