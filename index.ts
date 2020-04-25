import ampq from "amqplib";

import { getBookByISBN } from "./fetch/openlibrary";
import downloadFile from "./file_management";
import processPDF from "./parsing/pdf";

ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel())
  .then((channel) => {
    channel.consume("monocle_pdf_isbn", async (msg) => {
      if (msg) {
        const file = JSON.parse(msg.content.toString() || "");

        const fileBuffer = await downloadFile(file.url);

        if (file.format === "pdf") {
          const result = await processPDF(fileBuffer);
          const book = await getBookByISBN(result.isbn);

          console.log(book);
        }

        channel.ack(msg);
      }
    });
  });
