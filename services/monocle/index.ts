import ampq from "amqplib";

import { getBookByISBN } from "./fetch/openlibrary";
import downloadFile from "./file_management";
import createBookFromFile from "./entry";
import processFile from "./parsing";

ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel())
  .then((channel) => {
    channel.consume("monocle_file_scan", async (msg) => {
      if (msg) {
        const { token, scan, file } = JSON.parse(msg.content.toString() || "");

        const filePath = await downloadFile(file.url);

        processFile(filePath)
          .then(getBookByISBN)
          .then((book) => createBookFromFile(token, scan, book));

        channel.ack(msg);
      }
    });
  });
