import express from "express";
import { ApolloServer } from "apollo-server-express";
import ampq from "amqplib";
import { Pool } from "pg";
import schema from "./schema/schema";
import Bookshelf from "./datasources/bookshelf";
import { verify } from "jsonwebtoken";
import AccessCard from "./datasources/access_card";

const pool = new Pool();
const channel = ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel());

function getToken(header: string = "") {
  return header.replace("Bearer: ", "") || "";
}

function getUser(token: string) {
  if (token) {
    const decodedToken = verify(token, process.env.JWT_KEY || "default");
    if (decodedToken) {
      return decodedToken;
    }
  }

  return {};
}
// todo: need better context authentication, better token validation and error handling
// should the server handle refreshing itself, the token is there, right?

Promise.all([pool.connect(), channel])
  .then(([client, channel]) => {
    const app = express();

    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({
        setCookie: res.cookie.bind(res),
        token: getToken(req.headers.authorization),
        client: pool,
        ...getUser(getToken(req.headers.authorization)),
      }),
      dataSources: () => ({
        bookshelf: new Bookshelf(client, channel),
        accesscard: new AccessCard(),
      }),
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
