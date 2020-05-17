import { GraphQLError } from "graphql";

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

  extend type Mutation {
    login(input: LoginInput!): LoginResponse
    register(input: RegisterInput!): User
    forgot(email: String!): Boolean
    reset(token: String!): LoginResponse
  }

  extend type Query {
    refresh: String
    me: User @isAuthenticated
  }
`;

export const resolvers = {
  Query: {
    refresh: async (parent: any, args: any, context: any) => {
      const {
        refresh,
        token,
      } = await context.dataSources.accesscard.user.refresh(
        context.refreshToken
      );

      context.setCookie("accesscard-refresh", refresh, {
        httpOnly: true,
      });

      return token;
    },
    me: (parent: any, args: any, context: any) => {
      return context.user;
    },
  },
  Mutation: {
    login: (_: any, { input }: any, context: any) => {
      return context.dataSources.accesscard.user
        .login(input)
        .then(({ refresh, ...data }: any) => {
          context.setCookie("accesscard-refresh", refresh, {
            httpOnly: true,
          });

          return data;
        });
    },
    register: (_: any, { input }: any, context: any) => {
      return context.dataSources.accesscard.user.register(input);
    },
    forgot: async (_: any, { email }: any, context: any) => {
      const success = await context.dataSources.accesscard.user.forgot(email);

      if (!success) {
        throw new GraphQLError(
          "Something went wrong with sending a reset password email"
        );
      }

      return success;
    },
    reset: async (_: any, { token }: any, context: any) => {
      return context.dataSources.accesscard.user.reset(token);
    },
  },
};
