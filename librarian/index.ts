import express from "express";
import ampq from "amqplib";
import { createPool } from "slonik";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// @ts-ignore
import { createQueryLoggingInterceptor } from 'slonik-interceptor-query-logging';

import getApolloServer from "./graphql";

const interceptors = [
  createQueryLoggingInterceptor()
];

const pool = createPool(`postgres://${process.env.PGHOST}`, {
  interceptors
});

const channel = ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel());

Promise.all([pool, channel])
  .then(([client, channel]) => {
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());

    const apollo = getApolloServer(client, channel);

    apollo.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
