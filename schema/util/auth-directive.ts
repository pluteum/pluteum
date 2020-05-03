import { GraphQLField } from "graphql";
import { SchemaDirectiveVisitor } from "apollo-server-express";

export const typeDef = `
    directive @isAuthenticated on FIELD_DEFINITION
`;

export class isAuthenticatedDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any, any>) {
    field.resolve = async function (result, args, context, info) {
      if (!context || !context.user) {
        throw new Error("UNAUTHENTICATED");
      } else {
        result[field.name];
      }
    };
  }
}
