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

        processFile(filePath);

        // if (file.format === "pdf") {
        //   try {
        //     const result = await processPDF(fileBuffer);
        //     if (result.isbn) {
        //       const book = await getBookByISBN(result.isbn);
        //       await createBookFromFile(token, {
        //         file: { id: file.id },
        //         ...book,
        //       });
        //     }
        //   } catch (e) {
        //     console.error(e);
        //   }
        // }

        channel.ack(msg);
      }
    });
  });
