import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Book {
    id: Int
    author: [Author]
    uuid: String
    title: String
    isbn: String
    seriesIndex: Int
    filePath: String
    coverImage: String
    createdAt: String
    lastModifiedAt: String
  }

  input AuthorInput {
    id: Int
    name: String
  }

  input FileInput {
    id: Int
  }

  input AddBookInput {
    title: String!
    isbn: String
    seriesIndex: Int
    authors: [AuthorInput]
    file: FileInput
  }

  extend type Query {
    books: [Book]
    getBook(id: Int!): Book
  }

  extend type Mutation {
    addBook(input: AddBookInput): Book
  }
`;

export const resolvers = {
  Book: {
    author: (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.authors.getAuthorsOfBook(parent.id),
  },
  Query: {
    books: (_: any, __: any, context: any) =>
      context.dataSources.bookshelf.books.getBooks(),
    getBook: (_: any, args: any, context: any) =>
      context.dataSources.bookshelf.books.getBookById(args.id),
  },
  Mutation: {
    addBook: async (_: any, args: any, context: any) => {
      return context.dataSources.bookshelf.books.saveBook(args.input);
    },
  },
};
