import pdfParser from "pdf-parse";
import debug from "debug";

import { ParseResult } from "../book.type";

const pdfDebug = debug("pluteum:monocle:pdf");

export default async function process(pdf: Buffer): Promise<ParseResult> {
  const text = await pdfParser(pdf).then((data: any) => data.text);
  const result: ParseResult = {
    isbn: getISBN(text),
  };

  pdfDebug(`Parse Complete: ${JSON.stringify(result)}`);
  return result;
}

function getISBN(text: string): string | undefined {
  const ISBN10_REGEX = /^(?:ISBN(?:-10)?:?\ *((?=\d{1,5}([ -]?)\d{1,7}\2?\d{1,6}\2?\d)(?:\d\2*){9}[\dX]))$/i;
  const ISBN13_REGEX = /^(?:ISBN(?:-13)?:?\ *(97(?:8|9)([ -]?)(?=\d{1,5}\2?\d{1,7}\2?\d{1,6}\2?\d)(?:\d\2*){9}\d))$/i;

  const isbn13i = text.indexOf("ISBN-10");
  const isbn10i = text.indexOf("ISBN-13");
  const isbni = text.indexOf("ISBN");

  const isbn13 = text.slice(isbn13i, text.indexOf("\n", isbn13i));
  const isbn10 = text.slice(isbn10i, text.indexOf("\n", isbn10i));
  const isbn = text.slice(isbni, text.indexOf("\n", isbni));

  if (ISBN13_REGEX.test(isbn13)) {
    pdfDebug(`Found valid ISBN-13: ${isbn13}`);
    const match = ISBN13_REGEX.exec(isbn13);

    if (match) {
      return match[1];
    }
  } else if (ISBN10_REGEX.test(isbn10)) {
    pdfDebug(`Found valid ISBN-10: ${isbn10}`);

    const match = ISBN10_REGEX.exec(isbn10);

    if (match) {
      return match[1];
    }
  } else if (ISBN10_REGEX.test(isbn)) {
    pdfDebug(`Found valid ISBN-10: ${isbn}`);

    const match = ISBN10_REGEX.exec(isbn);

    if (match) {
      return match[1];
    }
  }

  pdfDebug(`Unable to parse ISBN via text search`);
  return undefined;
}
