export const typeDef = `
    extend type Query {
        getAuthor(id: Int!): Author
    }

    type Author {
        id: Int
        name: String
        books: [Book]
    }
`;

export const resolvers = {
  Query: {
    getAuthor: (_: any, args: any, context: any) => context.dataSources.bookshelf.authors.getAuthorById(args.id),
  },
  Author: {
    books: (parent: any, _: any, context: any) => context.dataSources.bookshelf.books.getBooksByAuthor(parent.id),
  }
};
