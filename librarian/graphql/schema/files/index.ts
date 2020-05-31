import { gql } from "apollo-server-express";

export const typeDef = gql`
  type File {
    id: Int
    md5: String
    uuid: String
    name: String
    format: String
    size: Float
    filePath: String
    url: String
    image: String
    processed: Boolean
    book: Book
    scans: [Scan]
  }

  extend type Query {
    files: [File] @isAuthenticated
    getFile(id: Int!): File @isAuthenticated
  }

  extend type Mutation {
    uploadFile(file: FileUpload): File
    deleteFile(id: Int): Boolean
    reprocessFile(id: Int): Boolean
  }
`;

export const resolvers = {
  Query: {
    files: (_: any, __: any, context: any) =>
      context.dataSources.bookshelf.files.getFiles(),
    getFile: (_: any, args: any, context: any) =>
      context.dataSources.bookshelf.files.getFileById(args.id),
  },
  Mutation: {
    // TODO: add some basic input validation here
    uploadFile: async (_: any, { file }: any, context: any) =>
      context.dataSources.bookshelf.files.addFile(file),
    deleteFile: async (_: any, { id }: any, context: any) =>
      context.dataSources.bookshelf.files.deleteFile(id),
    reprocessFile: async (_: any, { id }: any, context: any) =>
      context.dataSources.bookshelf.files.reprocessFile(id),
  },
  File: {
    book: async (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.books.getBookByFile(parent.id),
    scans: async (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.scans.getScansByFile(parent.id),
  },
};
