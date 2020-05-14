import express from "express";
import ampq from "amqplib";
import { Pool } from "pg";

import getApolloServer from "./graphql";

const pool = new Pool();
const channel = ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel());

// todo: need better context authentication, better token validation and error handling
// should the server handle refreshing itself, the token is there, right?

Promise.all([pool.connect(), channel])
  .then(([client, channel]) => {
    const app = express();
    const apollo = getApolloServer(client, channel);

    apollo.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
