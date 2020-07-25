import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Book {
    id: Int
    author: [Author]
    uuid: String
    title: String
    description: String
    isbn: String
    tags: [Tag]
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

  input TagInput {
    name: String
  }

  input FileInput {
    id: Int
  }

  input AddBookInput {
    title: String!
    description: String
    isbn: String
    seriesIndex: Int
    authors: [AuthorInput]
    tags: [TagInput]
    file: FileInput
  }

  extend type Query {
    books: [Book] @isAuthenticated
    getBook(id: Int!): Book @isAuthenticated
  }

  extend type Mutation {
    addBook(input: AddBookInput): Book
  }
`;

export const resolvers = {
  Book: {
    author: (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.authors.getAuthorsOfBook(parent.id),
    tags: (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.tags.getBooksTags(parent.id),
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
