import Axios, { AxiosError } from "axios";
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
  return Axios.get(url, { params: query })
    .then(({ data }) => {
      const isbnKey = Object.keys(data)[0];

      if (data[isbnKey]) {
        const results: any = { isbn };

        if (data[isbnKey].title) {
          results.title = data[isbnKey].title;
        }

        if (data[isbnKey].authors) {
          results.authors = data[isbnKey].authors.map((author: any) => ({
            name: author.name,
          }));
        }

        return results;
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
