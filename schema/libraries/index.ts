import { Pool, QueryResult } from "pg";
import { select } from "sql-bricks";

export const typeDef = `
    extend type Query {
        library(id: Int!): Library
    }

    type Library {
        id: Int
        name: String
        lang: String
        users: [User]
    }
`;

export const resolvers = {
  Query: {
    library: (parent: any, args: any, context: any) => {
      const db: Pool = context.client;

      const query = select().from("libraries").where({ id: args.id }).toParams();

      return db.query(query).then((val: QueryResult) => val.rows[0]);
    },
  },
  Library: {
      users: (parent: any, args: any, context: any) => {
        const libraryId = parent.id;
        const db: Pool = context.client;
  
        const query = select("users.*")
          .from("users")
          .join("users_libraries_link")
          .on("users.id", "users_libraries_link.user")
          .where({ library: libraryId })
          .toParams();

  
        return db.query(query).then((val: QueryResult) => val.rows);
      }
  }
};
