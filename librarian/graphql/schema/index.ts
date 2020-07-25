import { typeDef as User, resolvers as UserResolvers } from "./users";
import { typeDef as Library, resolvers as LibraryResolvers } from "./libraries";
import { typeDef as Author, resolvers as AuthorResolvers } from "./authors";
import { typeDef as Tag, resolvers as TagResolvers } from "./tags";
import { typeDef as Book, resolvers as BookResolvers } from "./books";
import { typeDef as File, resolvers as FileResolvers } from "./files";
import { typeDef as Scan, resolvers as ScanResolvers } from "./scans";
import { typeDef as Upload, resolvers as UploadResolvers } from "./util/upload";
import { makeExecutableSchema } from "apollo-server-express";
import {
  typeDef as isAuthenticated,
  isAuthenticatedDirective,
} from "./util/auth-directive";

const query = `
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

export default makeExecutableSchema({
  typeDefs: [
    query,
    isAuthenticated,
    Upload,
    Author,
    Tag,
    Book,
    File,
    User,
    Scan,
  ],
  resolvers: [
    UploadResolvers,
    AuthorResolvers,
    TagResolvers,
    BookResolvers,
    FileResolvers,
    UserResolvers,
    ScanResolvers,
  ],
  schemaDirectives: {
    isAuthenticated: isAuthenticatedDirective,
  },
});
