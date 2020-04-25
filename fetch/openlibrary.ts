import Axios from "axios";
import debug from "debug";

const openLibraryDebug = debug("pluteum:monocle:fetch:open_library");

// https://openlibrary.org/api/books?bibkeys=ISBN:1-59327-552-8&format=json&jscmd=data
export async function getBookByISBN(isbn: any) {
  const url = "https://openlibrary.org/api/books";
  const query = {
    bibkeys: `ISBN:${isbn}`,
    format: "json",
    jscmd: "data",
  };

  openLibraryDebug(`Requesting book data from ${url} with ISBN ${isbn}`);
  const response = await Axios.get(url, { params: query });

  const isbnKey = Object.keys(response.data)[0];

  return {
    title: response.data[isbnKey].title,
    url: response.data[isbnKey].url,
    authors: response.data[isbnKey].authors.map((author: any) => author.name),
    isbn,
  };
}
