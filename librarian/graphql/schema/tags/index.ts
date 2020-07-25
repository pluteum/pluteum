export const typeDef = `
    type Tag {
        id: Int
        name: String
        books: [Book]
    }

    extend type Query {
        getTag(id: Int): Tag
        tags: [Tag] @isAuthenticated
    }
`;

export const resolvers = {
  Query: {
    tags: (_: any, args: any, context: any) =>
      context.dataSources.bookshelf.tags.getAllTags(),
    getTag: (_: any, args: any, context: any) =>
      context.dataSources.bookshelf.tags.getTagById(args.id),
  },
  Tag: {
    books: (parent: any, _: any, context: any) =>
      context.dataSources.bookshelf.tags.getBooksByTag(parent.id),
  },
};
