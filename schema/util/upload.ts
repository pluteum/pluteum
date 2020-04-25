import { GraphQLUpload } from "graphql-upload";

export const typeDef = `scalar FileUpload`

export const resolvers = { FileUpload: GraphQLUpload }

