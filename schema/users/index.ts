import { Pool, QueryResult } from "pg";
import { select } from "sql-bricks";

export const typeDef = `
  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type User {
      id: Int
      firstName: String
      lastName: String
      email: String
  }

  extend type Query {
      me: User
  }
`;

export const resolvers = {
  Query: {
    me: (parent: any, args: any, context: any) => {
      return context.user;
    },
  },
  Mutation: {},
};
