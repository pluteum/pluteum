import pdfParser from "pdf-parse";
import debug from "debug";

import { ParseResult } from "../book.type";
import isISBN from "../isbn";

const pdfDebug = debug("pluteum:monocle:pdf");

export default async function process(pdf: Buffer): Promise<ParseResult> {
  return pdfParser(pdf).then(({ text }: any) => ({
    isbn: getISBN(text),
  }));
}

function getISBN(text: string): string | undefined {
  const isbn13i = text.indexOf("ISBN-13");
  const isbn10i = text.indexOf("ISBN-10");
  const isbni = text.indexOf("ISBN");

  const isbn13 = text
    .slice(isbn13i, text.indexOf("\n", isbn13i))
    .replace(/[- ]|^ISBN(?:-1[03])?:?/g, "");
  const isbn10 = text
    .slice(isbn10i, text.indexOf("\n", isbn10i))
    .replace(/[- ]|^ISBN(?:-1[03])?:?/g, "");
  const isbn = text
    .slice(isbni, text.indexOf("\n", isbni))
    .replace(/[- ]|^ISBN(?:-1[03])?:?/g, "");
  pdfDebug(`Potential ISBN Strings: ${isbn13}, ${isbn10}, ${isbn}`);

  if (isISBN(isbn13)) {
    pdfDebug(`Found valid ISBN-13: ${isbn13}`);
    return isbn13;
  } else if (isISBN(isbn10)) {
    pdfDebug(`Found valid ISBN-10: ${isbn10}`);
    return isbn10;
  } else if (isISBN(isbn)) {
    pdfDebug(`Found valid ISBN-10: ${isbn}`);
    return isbn;
  }

  pdfDebug(`Unable to parse ISBN via text search`);
  return undefined;
}
