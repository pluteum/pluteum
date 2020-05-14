import ampq from "amqplib";

import { getBookByISBN } from "./fetch/openlibrary";
import downloadFile from "./file_management";
import processPDF from "./parsing/pdf";
import createBookFromFile from "./entry";

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

          if (result.isbn) {
            const book = await getBookByISBN(result.isbn);
            await createBookFromFile({ file: { id: file.id }, ...book });
          }

        }

        channel.ack(msg);
      }
    });
  });
