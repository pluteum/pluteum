import express from "express";
import ampq from "amqplib";
import { Pool } from "pg";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import getApolloServer from "./graphql";

const pool = new Pool();
const channel = ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel());

Promise.all([pool.connect(), channel])
  .then(([client, channel]) => {
    const app = express();

    app.use(cookieParser())
    app.use(bodyParser.json())

    const apollo = getApolloServer(client, channel);

    apollo.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
