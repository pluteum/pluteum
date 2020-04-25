import express from "express";
import { ApolloServer } from "apollo-server-express";
import ampq from 'amqplib';
import { Pool } from "pg";
import schema from "./schema/schema";
import Bookshelf from "./datasources/bookshelf";

const pool = new Pool();
const channel = ampq.connect(process.env.AMPQ_URL || '').then((conn) => conn.createChannel())

Promise.all([pool.connect(), channel])
  .then(([client, channel]) => {
    const app = express();

    const server = new ApolloServer({
      schema,
      context: { client: pool, user: { library: 1 } },
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
