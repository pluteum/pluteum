import express from "express";
import ampq from "amqplib";
import { Client } from "minio";
import { createPool, sql } from "slonik";
import migrate from "node-pg-migrate";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// @ts-ignore
import { createQueryLoggingInterceptor } from "slonik-interceptor-query-logging";

import getApolloServer from "./graphql";

//@ts-ignore
const migration = migrate({
  dir: "./migrations",
  migrationsTable: "pgmigrations",
  direction: "up",
});

const interceptors = [createQueryLoggingInterceptor()];

const pool = createPool(`postgres://${process.env.PGHOST}`, {
  interceptors,
});

const minioClient = new Client({
  endPoint: process.env.MINIO_HOST || "",
  port: parseInt(process.env.MINIO_PORT || "80"),
  useSSL: !!process.env.MINIO_SSL,
  accessKey: process.env.MINIO_ACCESS_KEY || "",
  secretKey: process.env.MINIO_SECRET_KEY || "",
});

const makeBucketIfNotExists = minioClient
  .bucketExists("pluteum")
  .then((exists) => {
    if (!exists) {
      return minioClient.makeBucket("pluteum", "");
    }

    return;
  });

const channel = ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel());

const dbConnected = pool.query(sql`SELECT 1`);

Promise.all([channel, dbConnected, migration, makeBucketIfNotExists])
  .then(([channel]) => {
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());

    const apollo = getApolloServer(pool, channel, minioClient);

    apollo.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
