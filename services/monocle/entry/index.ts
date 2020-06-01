import { GraphQLClient } from "graphql-request";

const endpoint = "http://pluteum:4000/graphql";

const client = new GraphQLClient(endpoint);

const query = `mutation finishScan($scan: FinishScanInput){
  finishScan(scan: $scan) {
      uuid
    }
  }`;

export default function createBookFromFile(
  token: string,
  scan: any,
  book: any
) {
  client.setHeader("Authorization", `Bearer: ${token}`);
  return client.request(query, {
    scan: {
      uuid: scan.uuid,
      source: "Open Library",
      payload: JSON.stringify(book),
      error: null,
      finishedAt: new Date(Date.now())
        .toISOString()
        .replace("T", " ")
        .replace("Z", ""),
    },
  });
}
