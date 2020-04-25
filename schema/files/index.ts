import { gql } from "apollo-server-express";

export const typeDef = gql`
  type File {
      id: Int
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
      getFile(id: Int!): File
  }

  extend type Mutation {
    uploadFile(file: FileUpload): File
  }
`;

export const resolvers = {
  Query: {
    getFile: (_: any, args: any, context: any) =>
      context.dataSources.bookshelf.files.getFileById(args.id),
  },
  Mutation: {
    uploadFile: async (_: any, args: any, context: any) => context.dataSources.bookshelf.files.addFile(args.file),
  }
};
