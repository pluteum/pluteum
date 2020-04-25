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
      libraries: [Library]
  }

  extend type Query {
      me: User
      user(id: Int!): User
  }

  extend type Mutation {
    login(input: LoginInput): LoginResponse
    register(input: RegisterInput!): User
  }
`;

export const resolvers = {
  Query: {
    me: (parent: any, args: any, context: any) => {
      return context.user;
    },
    user: (parent: any, args: any, context: any) => {
      const db: Pool = context.client;

      const query = select().from("users").where({ id: args.id }).toParams();

      return db.query(query).then((val: QueryResult) => val.rows[0]);
    },
  },
  Mutation: {
    login: (_: any, args: any, context: any) => {
      return loginUser(args.input, context.client)
    },
    register: (_: any, args: any, context: any) => {
      return registerUser(args.input, context.client);
    }
  },
  User: {
    libraries: (parent: any, args: any, context: any) => {
      const userId = parent.id;
      const db: Pool = context.client;

      const query = select("libraries.*")
        .from("libraries")
        .join("users_libraries_link")
        .on("libraries.id", "users_libraries_link.library")
        .where({ user: userId })
        .toParams();

      return db.query(query).then((val: QueryResult) => val.rows);
    },
  },
};
