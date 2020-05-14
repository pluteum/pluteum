import { GraphQLField, defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from "apollo-server-express";

export const typeDef = `
    directive @isAuthenticated on FIELD_DEFINITION
`;

export class isAuthenticatedDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (source, args, context, info) {
      const result = await resolve.call(this, source, args, context, info);

      if (!context || !context.user) {
        throw new Error("UNAUTHENTICATED");
      } else {
        return result;
      }
    };
  }
}
