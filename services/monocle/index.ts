import ampq from "amqplib";

import { getBookByISBN } from "./fetch/openlibrary";
import downloadFile from "./file_management";
import { addSuccessfulScan, addUnsuccessfulScan } from "./entry";
import processFile from "./parsing";
import fetchData from "./fetch/ebook-meta";
import { lookpath } from "lookpath";

lookpath("fetch-ebook-metadata").then((result) => {
  if (!result) {
    throw new Error("Calibre is not installed!");
  }
});

const FILE_QUEUE = "monocle_file_scan";

ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel())
  .then((channel) => {
    return channel.assertQueue(FILE_QUEUE).then(function () {
      channel.consume(FILE_QUEUE, async (msg) => {
        if (msg) {
          const { token, scan, file } = JSON.parse(
            msg.content.toString() || ""
          );

          downloadFile(file.path)
            .then(processFile)
            .then(fetchData)
            .then((book) => addSuccessfulScan(token, scan, book))
            .catch((e) => addUnsuccessfulScan(token, scan, e));

          setTimeout(() => channel.ack(msg), 2500);
        }
      });
    });
  });
