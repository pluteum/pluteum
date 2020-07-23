import ampq from "amqplib";

import { getBookByISBN } from "./fetch/openlibrary";
import downloadFile from "./file_management";
import { addSuccessfulScan, addUnsuccessfulScan } from "./entry";
import processFile from "./parsing";
import fetchData from "./fetch/ebook-meta";

ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel())
  .then((channel) => {
    channel.consume("monocle_file_scan", async (msg) => {
      if (msg) {
        const { token, scan, file } = JSON.parse(msg.content.toString() || "");

        downloadFile(file.path)
          .then(processFile)
          .then(fetchData)
          .then((book) => addSuccessfulScan(token, scan, book))
          .catch((e) => addUnsuccessfulScan(token, scan, e));

        setTimeout(() => channel.ack(msg), 2500);
      }
    });
  });
