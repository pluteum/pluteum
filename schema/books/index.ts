import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Book {
      id: Int
      author: Author
      uid: String
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

  input AddBookInput {
    title: String!
    isbn: String
    seriesIndex: Int
    author: AuthorInput
  }

  extend type Query {
      getBook(id: Int!): Book
  }

  extend type Mutation {
    addBook(input: AddBookInput): Book
  }
`;

export const resolvers = {
  Book: {
    author: (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.authors.getAuthorOfBook(parent.id),
  },
  Query: {
    getBook: (_: any, args: any, context: any) =>
      context.dataSources.bookshelf.books.getBookById(args.id),
  },
  Mutation: {
    addBook: async (_: any, args: any, context: any) => {
      // Save book and author details via Bookshelf
      const book = {title: args.input.title, isbn: args.input.isbn, seriesIndex: args.input.seriesIndex, author: args.input.author};
      const files = await Promise.all(args.input.files);

      await context.dataSources.bookshelf.books.saveBook(book, files);
    }
  }
};
