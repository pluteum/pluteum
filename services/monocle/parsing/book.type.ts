// creating a type for parse results with the idea that in the future,
// parsers will be able to extract more information out of a file than just
// an isbn
export type ParseResult = {
  isbn: string | undefined;
};
