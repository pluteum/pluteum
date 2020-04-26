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
  }

  extend type Query {
    files: [File]
    getFile(id: Int!): File
  }

  extend type Mutation {
    uploadFile(file: FileUpload): File
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
    uploadFile: async (_: any, args: any, context: any) =>
      context.dataSources.bookshelf.files.addFile(args.file),
  },
  File: {
    book: async (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.books.getBookByFile(parent.id),
  },
};
