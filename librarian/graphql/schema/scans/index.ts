import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Scan {
    id: Int
    uuid: String
    file: File
    source: String
    payload: String
    error: String
    seen: Boolean
    queuedAt: String
    finishedAt: String
  }

  input ScanInput {
    file: Int
    source: String
    payload: String
    error: String
    queuedAt: String
    finishedAt: String
  }

  input FinishScanInput {
    uuid: String
    source: String
    payload: String
    error: String
    finishedAt: String
  }

  extend type Query {
    scans: [Scan] @isAuthenticated
    getScan(id: Int!): File @isAuthenticated
  }

  extend type Mutation {
    uploadScan(scan: ScanInput): Scan
    finishScan(scan: FinishScanInput): Scan
  }
`;

export const resolvers = {
  Query: {
    scans: (_: any, __: any, context: any) =>
      context.dataSources.bookshelf.scans.getScans(),
    getScan: (_: any, args: any, context: any) =>
      context.dataSources.bookshelf.files.getScanById(args.id),
  },
  Mutation: {
    uploadScan: async (_: any, { scan }: any, context: any) =>
      context.dataSources.bookshelf.scans.addScan(scan),
    finishScan: async (_: any, { scan }: any, context: any) =>
      context.dataSources.bookshelf.scans
        .finishScan(scan)
        .then(async (scan: any) => {
          if (scan.payload) {
            const book = JSON.parse(scan.payload);
            const file = { id: scan.fileId };

            await context.dataSources.bookshelf.books.saveBookFromScan({
              file,
              ...book,
            });
          }

          return scan;
        }),
  },
  Scan: {
    file: async (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.scans.getFileByScan(parent.id),
  },
};
