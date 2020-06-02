import { GraphQLClient } from "graphql-request";
import debug from "debug";

const entryDebug = debug("pluteum:monocle:entry");

const endpoint = "http://pluteum:4000/graphql";

const client = new GraphQLClient(endpoint);

const query = `mutation finishScan($scan: FinishScanInput){
  finishScan(scan: $scan) {
      uuid
    }
  }`;

export function addSuccessfulScan(token: string, scan: any, book: any) {
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

export function addUnsuccessfulScan(token: string, scan: any, error: Error) {
  client.setHeader("Authorization", `Bearer: ${token}`);
  return client
    .request(query, {
      scan: {
        uuid: scan.uuid,
        source: null,
        payload: null,
        error: error.message,
        finishedAt: new Date(Date.now())
          .toISOString()
          .replace("T", " ")
          .replace("Z", ""),
      },
    })
    .catch((e) =>
      entryDebug(
        `Failed to save scan results of scan ${scan.uuid}. \n ${e.message}`
      )
    );
}
