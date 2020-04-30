import express from "express";
import { ApolloServer } from "apollo-server-express";
import ampq from "amqplib";
import { Pool } from "pg";
import schema from "./schema/schema";
import Bookshelf from "./datasources/bookshelf";
import { verify } from "jsonwebtoken";

const pool = new Pool();
const channel = ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel());

function getUser(authorizationHeader: string = "") {
  const token = authorizationHeader.replace("Bearer: ", "");

  return verify(token, process.env.JWT_KEY || "") as object;
}

Promise.all([pool.connect(), channel])
  .then(([client, channel]) => {
    const app = express();

    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({
        client: pool,
        ...getUser(req.headers.authorization),
      }),
      dataSources: () => ({ bookshelf: new Bookshelf(client, channel) }),
      tracing: true,
    });

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
