import Axios, { AxiosError } from "axios";
import debug from "debug";

const openLibraryDebug = debug("pluteum:monocle:fetch:open_library");

function makeDataRequest(isbn: any) {
  const url = "https://openlibrary.org/api/books";
  const query = {
    bibkeys: `ISBN:${isbn}`,
    format: "json",
    jscmd: "data",
  };

  return Axios.get(url, { params: query });
}

function makeDetailsRequest(isbn: any) {
  const url = "https://openlibrary.org/api/books";
  const query = {
    bibkeys: `ISBN:${isbn}`,
    format: "json",
    jscmd: "details",
  };

  return Axios.get(url, { params: query });
}

// https://openlibrary.org/api/books?bibkeys=ISBN:1-59327-552-8&format=json&jscmd=data
export async function getBookByISBN(isbn: any) {
  openLibraryDebug(`Requesting book data from Open Library with ISBN ${isbn}`);
  const results: any = { isbn };
  return makeDataRequest(isbn)
    .then(({ data }) => {
      const isbnKey = Object.keys(data)[0];

      if (data[isbnKey]) {
        if (data[isbnKey].title) {
          results.title = data[isbnKey].title;
        }

        if (data[isbnKey].authors) {
          results.authors = data[isbnKey].authors.map((author: any) => ({
            name: author.name,
          }));
        }
      } else {
        throw new Error();
      }
    })
    .then(() => makeDetailsRequest(isbn))
    .then(({ data }) => {
      const isbnKey = Object.keys(data)[0];

      if (data[isbnKey]) {
        if (data[isbnKey].details.description) {
          results.description = data[isbnKey].details.description;
        }
      } else {
        throw new Error();
      }
    })
    .catch((e: AxiosError) => {
      openLibraryDebug(
        `Failed to retrieve data from OpenLibrary, request errored with the following: \n ${e.message}`
      );
      throw new Error("FAILED_LOOKUP");
    });
}
