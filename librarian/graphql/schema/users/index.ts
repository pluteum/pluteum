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
  }

  extend type Query {
      me: User @isAuthenticated
  }
`;

export const resolvers = {
  Query: {
    me: (parent: any, args: any, context: any) => {
      return context.user;
    },
  },
  Mutation: {
    login: (_: any, { input }: any, context: any) => {
      return context.dataSources.accesscard
        .login(input)
        .then(({ data, refreshToken }: any) => {
          context.setCookie("accesscard-refresh", refreshToken, {
            httpOnly: true,
          });

          return data;
        });
    },
    register: (_: any, { input }: any, context: any) => {
      return context.dataSources.accesscard.register(input);
    },
  },
};
