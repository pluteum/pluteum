import { request, GraphQLClient } from "graphql-request";

const endpoint = "http://librarian:4000/graphql";

const query = `mutation addBook($input: AddBookInput){
    addBook(input: $input) {
      uuid
    }
  }`;

export default function createBookFromFile(book: any) {
  return request(endpoint, query, { input: book });
}
