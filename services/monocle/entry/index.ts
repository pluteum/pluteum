import { request, GraphQLClient } from "graphql-request";

const endpoint = "http://pluteum:4000/graphql";

const client = new GraphQLClient(endpoint);

const query = `mutation addBook($input: AddBookInput){
    addBook(input: $input) {
      uuid
    }
  }`;

export default function createBookFromFile(token: string, book: any) {
  client.setHeader("Authorization", `Bearer: ${token}`);
  return client.request(query, { input: book });
}
